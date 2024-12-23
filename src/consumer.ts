import { kafka } from "./client";
const group = process.argv[2] || "user-1";

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  console.log("Consumer connecting...");
  await consumer.connect();
  console.log("Consumer connected");

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      console.log(
        `GROUP:${group}
        TOPIC:[${topic}]
        PARTITION:${partition}
        MESSAGE:${message.value}`
      );
    },
  });
}

init().catch(console.error);