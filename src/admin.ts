import { kafka } from "./client";

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  await admin.connect();
  console.log("Admin connected");

  console.log("Creating topics...");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topics created successfully [rider-updates]");

  console.log("Closing admin...");
  await admin.disconnect();
}

init().catch(console.error);