import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from pAInt",
  });
  console.log(req, res);
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }

  image_url = response.data.data[0].url;
});

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));
