import redis from "redis"

// connnecting to redis db
export let redisClient = redis.createClient({})
redisClient.on("error", err => console.log("redis Error :", err))
await redisClient.connect().then(() => console.log("connected to redis db"))