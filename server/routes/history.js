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

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newHistory = new PromptHistory({
      user: req.user._id,
      prompt: req.body.prompt,
      image: req.body.image,
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

export default router;
