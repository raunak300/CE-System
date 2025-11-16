const { Worker, Queue } = require('bullmq');
const connectRedis = require('../Redis-Connection/Item-Connect');
const supabase = require('../Model/Supa-Connect');
const { sendAdminEmail, sendUserEmail } = require('../Email-function/EmailServices')

let connection;
let DLQMGMT;

const queueReady = async () => {
    if (!connection) {
        connection = await connectRedis();
    }

    if (!DLQMGMT) {
        DLQMGMT = new Queue('DLQ-Queue', { connection });
        console.log("DLQ Queue initialized");
    }
};

const addToDLQ = async (role, email, allData, reason) => {
    await queueReady();

    await DLQMGMT.add("dlq-job",
        {
            role,
            email,
            items: allData,
            reason,          // must be string
            timestamp: Date.now()
        }, {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: true,
    }
    );

    console.log("DLQ entry created");
};

const startWorker = async () => {
    try {
        connection = await connectRedis();
        if (!connection) {
            console.log("Can't connect to redis");
            return;
        }

        const ItemWorker = new Worker(
            'IUPD-Queue',
            async (job) => {

                const { email, allData } = job.data.data;
                const role = job.data.role;

                // Supabase procedure
                const { data: output, error: procErr } =
                    await supabase.rpc('update_items_proc', { items_data: allData });

                if (procErr) {
                    throw new Error("SUPABASE_PROCEDURE_FAILED");
                }

                // Email sending
                let emailSent = false;

                if (output === true) {
                    if (role === "user") {
                        emailSent = await sendUserEmail(email, role, allData);
                    } else {
                        emailSent = await sendAdminEmail(email, role, allData);
                    }
                }

                if (!emailSent) {
                    throw new Error("EMAIL_FAILED");
                }

                return { message: "SUCCESS" };
            },
            {
                concurrency: 1,
                connection,
                removeOnComplete: true,
                removeOnFail: false
            }
        );

        // Worker events
        ItemWorker.on('completed', (job) => {
            console.log(`Job completed: ${job.id}`);
        });

        ItemWorker.on('failed', async (job, err) => {
            console.log(`Job failed: ${job.id}`, err.message);

            const { email, allData } = job.data.data;
            const role = job.data.role;

            await addToDLQ(role, email, allData, err.message);
        });

    } catch (err) {
        console.log("Worker crashed:", err);
    }
};

module.exports = startWorker;
