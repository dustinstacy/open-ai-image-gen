import express from "express";

import PromptHistory from "../models/PromptHistory.js";
import requiresAuth from "../middleware/permissions.js";
import validateHistory from "../validation/historyValidation.js";

const router = express.Router();

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
    console.log(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newHistory = new PromptHistory({
      user: req.body.user,
      prompt: req.body.prompt,
      images: req.body.images,
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
