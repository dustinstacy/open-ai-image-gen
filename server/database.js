import * as dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Database Server");
});

app.post("/name", (req, res) => {
  if (req.body.name) {
    return res.json({ name: req.body.name });
  } else {
    return res.status(400).json({ error: "No name provided" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
