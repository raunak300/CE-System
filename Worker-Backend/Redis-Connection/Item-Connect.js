const Redis =require( 'ioredis');

const dotenv = require('dotenv');
dotenv.config();


const connectRedis=async ()=>{
    const client = new Redis({
        username: 'default',
        password: process.env.REDIS_KEY,
          maxRetriesPerRequest: null,
            host: 'redis-17934.c10.us-east-1-4.ec2.cloud.redislabs.com',
port: 17934,
        
    });

    client.on('connect',()=>{
        console.log("Conneced to redis");
    })
    
    client.on('error',(error)=>{
        console.log('Error on Redis: ',error)
    })

     try {
    await client.ping();
    console.log("Redis ping OK");
  } catch (error) {
    console.error("Redis ping failed:", error);
  }

  return client;
}

module.exports=connectRedis;
