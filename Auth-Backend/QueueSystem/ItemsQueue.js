const { Queue } = require('bullmq')
const connectRedis = require('../RedisConnection/connect')

let ItemUpdation
let connection

// Initialize queue and Redis connection
const queueReady = async () => {
  try {
    if (!connection) {
      connection = await connectRedis()
      ItemUpdation = new Queue('IUPD-Queue', { connection })
      console.log("Queue initialized")
    }
  } catch (error) {
    console.error("Redis/queue error:", error)
  }
}

const updateItems = async (role, object) => { // object must have email, item_data
  await queueReady()

  if (!ItemUpdation) {
    console.error("Queue not initialized")
    return { job: null,message:"Queue not intialised"}
  }

  try {
    console.log("redis object",object)
    const priority = role === 'admin' ? 2 : 1

    const job = await ItemUpdation.add(
      'update-call',
      { data: object, role },
      {
        attempts: 3,
        priority,
        removeOnComplete: true,
        removeOnFail: false,
      }
    )

    console.log(`Job added with ID: ${job.id} for role: ${role} (priority: ${priority})`)
    return {job,message:"Queue add operation is complete"}
  } catch (error) {
    console.error("Error while adding job:", error)
    return { job: null,message:"error while adding job"}
  }
}

module.exports = { updateItems }
