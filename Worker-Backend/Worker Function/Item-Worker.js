const {Worker}=require('bullmq')
const connectRedis=require('./Redis-Connection/Item-Connect')

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

                //put in procedure check reponse and think of DLQ or end email queue

                return {message:"This task is done properly"}
            },{connection}
        )

    } catch (error) {
        console.log('error in catch: ',error)
        return {message:"this task have error"}
    }
}

module.exports=startWorker;