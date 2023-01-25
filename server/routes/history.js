import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import PromptHistory from "../models/PromptHistory.js";
import requiresAuth from "../middleware/permissions.js";
import validateHistory from "../validation/historyValidation.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @route GET /api/history/test
// @desc Test the history route
// @access Public
router.get("/test", (req, res) => {
  res.send("History route working");
});

// @route Post /api/history/add
// @desc Create a new prompt history
// @access Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateHistory(req.body);
    const imageUrls = req.body.images;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const imageData = [];

    for (let image in imageUrls) {
      const urls = await cloudinary.uploader.upload(imageUrls[image]);
      imageData.push(urls.url);
    }
    console.log(imageData);

    const newHistory = new PromptHistory({
      user: req.body.user,
      name: req.body.name,
      prompt: req.body.prompt,
      images: imageData,
    });

    await newHistory.save();

    return res.json(newHistory);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error.message);
  }
});

// @route GET /api/history/current
// @desc Current users history
// @access Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const history = await PromptHistory.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.json(history);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// @route PUT /api/history/:historyId/favorite
// @desc Mark prompt history as favorite
// @access Private
router.put("/:historyId/favorite", requiresAuth, async (req, res) => {
  try {
    const history = await PromptHistory.findOne({
      user: req.user._id,
      _id: req.params.historyId,
    });

    if (!history) {
      return res.status(404).json({ error: "History does not exist" });
    }

    if (history.favorite) {
      return res.status(400).json({ error: "Already added to favorites" });
    }

    const updatedHistory = await PromptHistory.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.historyId,
      },
      {
        favorite: true,
      },
      {
        new: true,
      }
    );

    return res.json(updatedHistory);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

// @route PUT /api/history/:historyId/removeFavorite
// @desc Remove favorite from prompt history
// @access Private
router.put("/:historyId/removeFavorite", requiresAuth, async (req, res) => {
  try {
    const history = await PromptHistory.findOne({
      user: req.user._id,
      _id: req.params.historyId,
    });

    if (!history) {
      return res.status(404).json({ error: "History does not exist" });
    }

    if (!history.favorite) {
      return res.status(400).json({ error: "Already removed from favorites" });
    }

    const updatedHistory = await PromptHistory.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.historyId,
      },
      {
        favorite: false,
      },
      {
        new: true,
      }
    );

    return res.json(updatedHistory);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

export default router;
