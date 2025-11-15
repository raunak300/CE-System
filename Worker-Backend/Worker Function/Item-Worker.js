const {Worker}=require('bullmq')
const connectRedis=require('../Redis-Connection/Item-Connect')
const supabase=require('../Model/Supa-Connect')

let connection;
const startWorker=async()=>{
    try {
        connection=await connectRedis();
        if(!connection){
            return {message:"can't connect to redis"}
        }
        const ItemWorker=new Worker(
            'IUPD-Queue',
            async (job)=>{
                console.log("job data: ",job.id)

                //call Procedure on supabase
                const {email,allData}=job.data.data;
                const role=job.data.role;
                const {data:procedure_output, error:procedure_error}=await supabase.rpc(
                    'update_items_proc',
                    {items_data:allData}
                )
                if(procedure_error){
                    console.log("This is error at procedure:",procedure_error)
                    throw new Error("Procedure Error")
                }
                if(procedure_output===true){
                    console.log("will send email to ",email)
                    return {message:"completed and sending email"}
                    //add to email queue 
                }

                console.log(email,allData,role)

                return {message:"This task is done properly"}
            }
            ,{
                concurrency: 1,
                connection
            }
        )

        ItemWorker.on('completed',(job)=>{
            console.log(`job id completed: ${job.id}`)
        })

         ItemWorker.on('failed', (job, err) => {
            console.log(`Job ${job.id} failed:`, err);
        });


    } catch (error) {
        if(error==="Pocedure Error"){
            //add to DLQ
            console.log("adding to DLQ")
        }
        console.log('error in catch: ',error)
        return {message:"this task have error"}
    }
}

module.exports=startWorker;