const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const uri =
  "mongodb+srv://admin:admin123@testdb.3qrnttg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();

app.use(express.static("../Front"));
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
    res.sendFile(path.join(__dirname, "../Front", "index.html"));
  });

  client.close();
}

main();
app.listen(PORT, () => console.log("Port Listening"));
