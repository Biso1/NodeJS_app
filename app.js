require("dotenv").config();
const express = require("express")
const {MongoClient} = require("mongodb")
const app = express()
const port = 3000;

const client = new MongoClient(process.env.key)
const database = client.db("simple")
const messages = database.collection("messages")
// async function testt(){
//   const result = await messagee.findOneAndReplace({}, {message: "hey"})
//   let final = result.value;
//   console.log(final)
// }
// testt()
const MESSAGE_LIMIT = 100;
app.use(express.json());
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/content", async (req, res) => {
  console.log(JSON.stringify(req.headers))
  const result = await messages.findOne({});
  res.send(result);
});


app.post("/api", async (req, res) => {
  let message = req.body;
  message = message["message"]
  await messages.replaceOne({},{message: message})
  res.send("Message received.");
});


app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});
