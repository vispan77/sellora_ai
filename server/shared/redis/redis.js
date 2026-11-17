import Redis from "ioredis";

const redis = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379", {
        maxRetriesPerRequest: null,
    }
);

redis.on("connect", () => {
    console.log("Redis is connect Successfully")
})

redis.on("error", (error) => {
    console.log(`redis error = ${error}`)
})

export default redis;