const { Worker } = require('bullmq');
const connectRedis = require('../Redis-Connection/Item-Connect');
const supabase = require('../Model/Supa-Connect');
const { sendAdminEmail, sendUserEmail } = require('../Email-function/EmailServices');

let connection;

const queueReady = async () => {
    if (!connection) {
        connection = await connectRedis();
    }
};

const manageDLQ = async () => {
    await queueReady();

    if (!connection) {
        console.log("Can't connect to redis for DLQ worker");
        return;
    }

    const DLQWorker = new Worker(
        'DLQ-Queue',
        async (job) => {
            const { role, email, items, reason, timestamp } = job.data;

            try {
                if (reason === "EMAIL_FAILED") {
                    if (role === "user") {
                        await sendUserEmail(email, role, items);
                    } else {
                        await sendAdminEmail(email, role, items);
                    }

                    return { message: "Email retry successful" };
                }

                // fallback: log to Supabase
                const { error: logErr } = await supabase
                    .from('Item_LOGS')
                    .insert({
                        user_email: email,
                        reason,
                        items,
                        created_at: new Date(timestamp)
                    });

                if (logErr) {
                    throw logErr;
                }

                return { message: "Logged to Supabase" };

            } catch (err) {
                console.log("DLQ Worker Retry Failed:", err.message);

                await supabase
                    .from('Item_LOGS')
                    .insert({
                        user_email: email,
                        reason: err.message,
                        items,
                        created_at: new Date(timestamp)
                    });

                throw err;
            }
        },
        {
            concurrency: 2,
            connection,
            removeOnComplete: true,
            removeOnFail: false
        }
    );

    DLQWorker.on('completed', (job) => {
        console.log(`DLQ Job handled successfully: ${job.id}`);
    });

    DLQWorker.on('failed', (job, err) => {
        console.log(`DLQ Job failed permanently: ${job.id}`, err.message);
    });
};

module.exports = manageDLQ;
