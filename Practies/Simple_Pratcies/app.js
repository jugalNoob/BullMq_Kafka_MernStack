const express = require("express");
const { Kafka } = require('kafkajs')

const app = express();

const port = 9000;

app.get("/", (req, res) => {
    res.send("Hello World");
});




const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
