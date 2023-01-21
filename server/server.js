import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { Configuration, OpenAIApi } from "openai";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import historyRoute from "./routes/history.js";
import promptsRoute from "./routes/prompts.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "We are connected",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const count = parseInt(req.body.count);
    const size = req.body.size;

    const response = await openai.createImage({
      prompt: prompt,
      n: count,
      size: size,
    });

    res.status(200).send({
      images: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/history", historyRoute);
app.use("/api/prompts", promptsRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
