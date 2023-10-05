const express = require("express");
const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbUrl = process.env.URI;

const client = new MongoClient(dbUrl);

const app = express();

app.use(express.static("../client"));
app.use(express.json());

const PORT = 5600;

async function main() {
  await client.connect();
  console.log("Connected successfully !");

  const db = client.db("arkx");

  const arkadians = db.collection("arkadians");

  const data = await arkadians.find().toArray();

  app.get("/arkx", (req, res) => {
    res.json(data);
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
  });

  client.close();
}

main();
app.listen(PORT, () => console.log("Port Listening"));
