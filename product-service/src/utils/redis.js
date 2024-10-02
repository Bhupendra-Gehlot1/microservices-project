import { createClient } from "redis";

// Client for publishing
const publishClient = createClient({
  url: process.env.REDIS_URL,
});

// Client for subscribing
const subscribeClient = createClient({
  url: process.env.REDIS_URL,
});

publishClient.on("error", (err) =>
  console.log("Redis Publish Client Error", err)
);
subscribeClient.on("error", (err) =>
  console.log("Redis Subscribe Client Error", err)
);

// Connect both clients
(async () => {
  await publishClient.connect();
  await subscribeClient.connect();
})();

export const publishEvent = async (channel, message) => {
  try {
    await publishClient.publish(channel, JSON.stringify(message));
  } catch (error) {
    console.error("Error publishing event:", error);
  }
};

export const subscribeToEvent = async (channel, callback) => {
  try {
    await subscribeClient.subscribe(channel, (message) => {
      callback(JSON.parse(message));
    });
  } catch (error) {
    console.error("Error subscribing to event:", error);
  }
};

export const closeConnections = async () => {
  await publishClient.quit();
  await subscribeClient.quit();
};

export { publishClient, subscribeClient };
