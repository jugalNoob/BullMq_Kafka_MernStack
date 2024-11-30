const kafka = require("./client"); // Import the Kafka client

async function init() {
  const producer = kafka.producer(); // Create a Kafka producer

  console.log("Connecting producer...");
  await producer.connect(); // Connect the producer
  console.log("Producer connected successfully");

  // Send a message to Kafka
  await producer.send({
    topic: 'rider-updates',
    messages: [
      {
        partition: 0, // Optional: Specify a partition
        key: "location-update", // Optional: Message key for ordering
        value: JSON.stringify({ name: "jugal", loc: "Jammu" }), // Correct JSON.stringify usage
      },
    ],
  });
  console.log("Message sent successfully");

  await producer.disconnect(); // Disconnect the producer
  console.log("Producer disconnected successfully");
}

init().catch((error) => {
  console.error("Error in producer:", error); // Catch and log errors
});
