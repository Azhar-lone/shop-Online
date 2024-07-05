import redis from "redis";

// Function to connect to Redis
export async function redisConnect() {
  try {
    // Create Redis client
    let redisClient = await redis.createClient();

    // Optional: Perform a connection check
    redisClient.on("connect", () => {
      console.log("Connected to Redis");
    });

    // Optional: Handle any connection errors
    redisClient.on("error", (error) => {
      console.error("Error connecting to Redis:", error);
    });

    // Return the Redis client
    return redisClient;
  } catch (error) {
    console.error("Error while connecting to Redis:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}
