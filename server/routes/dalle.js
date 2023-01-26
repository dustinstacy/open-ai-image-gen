import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// @route GET /api/dalle/test
// @desc Test the dalle route
// @access Public
router.get("/", async (req, res) => {
  res.status(200).send({
    message: "We are connected",
  });
});

// @route Post /api/dalle
// @desc Generate images
// @access Public
router.post("/", async (req, res) => {
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

export default router;
