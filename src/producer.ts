import { Kafka } from "kafkajs";
import * as readline from "readline";
import { Interface } from "readline";

import { kafka } from "./client";

const rl: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async (line: string) => {
      const [riderName, location] = line.split(" ");

      if (!riderName || !location) {
        console.log("Invalid input. Please provide input in the format: <riderName> <location>");
        rl.prompt();
        return;
      }

      try {
        await producer.send({
          topic: "rider-updates",
          messages: [
            {
              partition: location.toLowerCase() === "north" ? 0 : 1,
              key: "location-update",
              value: JSON.stringify({ name: riderName, location }),
            },
          ],
        });
        console.log(`Message sent for rider "${riderName}" with location "${location}".`);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      rl.prompt();
    });

    rl.on("close", async () => {
      console.log("Disconnecting Producer...");
      await producer.disconnect();
      console.log("Producer Disconnected. Goodbye!");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error initializing producer:", error);
    process.exit(1);
  }
}

init();
