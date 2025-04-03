const express = require("express");
const shortid = require("shortid");
const { sendMessage, initProducer } = require("../producer/producer");

const router = express.Router();

// Initialize Kafka Producer
initProducer();

// Create User Route
router.post("/create-user", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "❌ Name, email, and password are required." });
    }

    try {
        const user = { name, email, password, shortId: shortid.generate() };
        await sendMessage("UserRestapi", user);

        res.status(201).json({
            message: "✅ User created and sent to Kafka successfully",
            user,
        });
    } catch (error) {
        console.error("❌ Error sending user data to Kafka:", error);
        res.status(500).json({ error: "Failed to send user data to Kafka" });
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const  Register = require('../module/student');
// const kafka = require('../client/client'); // Import the Kafka client
// const shortid = require('shortid'); // Import shortid library
// // Kafka Producer setup
// let producer;

// async function initProducer() {
//   try {
//     console.log('Connecting Kafka Producer...');
//     producer = kafka.producer();
//     await producer.connect();
//     console.log('Kafka Producer connected successfully');
//   } catch (error) {
//     console.error('Error initializing Kafka Producer:', error);
//   }
// }

// // Disconnect the producer gracefully when the server shuts down
// async function disconnectProducer() {
//   try {
//     if (producer) {
//       await producer.disconnect();
//       console.log('Kafka Producer disconnected successfully');
//     }
//   } catch (error) {
//     console.error('Error disconnecting Kafka Producer:', error);
//   }
// }

// // REST API to create a user and send data to Kafka
// router.post("/create-user", async (req, res) => {
//   const { name, email, password } = req.body;

  
//   const shortId = shortid.generate();
//   console.log(shortId)

//   // Validate required fields
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "Name, email, and password are required." });
//   }

//   try {
//     // Create user object
//     const user = { name, email, password , shortId };

//     // Send user data to Kafka topic
//     await producer.send({
//       topic: "UserRestapi", // Kafka topic name
//       messages: [
//         {
//           key: email, // Using email as the key for ordering
//           value: JSON.stringify(user), // Serialize user object
//         },
//       ],
//     });

//     console.log("Message sent successfully:", user);
//     res.status(201).json({
//       message: "User created and sent to Kafka successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Error sending user data to Kafka:", error);
//     res.status(500).json({ error: "Failed to send user data to Kafka" });
//   }
// });
// // Initialize Kafka producer when the server starts
// initProducer();

// // Gracefully disconnect the producer when the server shuts down
// process.on('SIGINT', async () => {
//   console.log('Shutting down server...');
//   await disconnectProducer();
//   process.exit(0);
// });

// module.exports = router;
