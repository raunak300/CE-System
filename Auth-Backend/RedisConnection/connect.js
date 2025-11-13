const Redis =require( 'ioredis');

const dotenv = require('dotenv');
dotenv.config();


const connectRedis=async ()=>{
    const client = new Redis({
        username: 'default',
        password: process.env.REDIS_KEY,
    
            host: 'redis-19714.c244.us-east-1-2.ec2.cloud.redislabs.com',
            port: 19714,
        
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
