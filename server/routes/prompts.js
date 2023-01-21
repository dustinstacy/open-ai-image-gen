import express from "express";

import Prompts from "../models/Prompts.js";
import requiresAuth from "../middleware/permissions.js";
import validatePrompt from "../validation/promptValidation.js";

const router = express.Router();

// @route GET /api/prompts/test
// @desc Test the prompt route
// @access Admin
router.get("/test", requiresAuth, (req, res) => {
  res.send("Prompts route working");
});

// @route Post /api/prompts/add
// @desc Add new prompt to builder
// @access Admin
router.post("/add", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validatePrompt(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPrompt = new Prompts({
      user: req.user._id,
      prompt: req.body.prompt,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
    });

    await newPrompt.save();

    return res.json(newPrompt);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error.message);
  }
});

// @route GET /api/prompts
// @desc Current users Prompt
// @access Public
router.get("/", async (req, res) => {
  try {
    const prompts = await Prompts.find({ ...Prompts });

    return res.json(prompts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// @route   PUT /api/prompts/:promptId
// @desc    Update a prompt
// @access  Admin
router.put("/:promptId", requiresAuth, async (req, res) => {
  try {
    const prompt = await Prompts.findOne({
      _id: req.params.promptId,
    });

    if (!prompt) {
      return res.status(404).json({ error: "Could not find prompt" });
    }

    const { isValid, errors } = validatePrompt(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updatedPrompt = await Prompts.findOneAndUpdate(
      {
        _id: req.params.promptId,
      },
      {
        prompt: req.body.prompt,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
      },
      {
        new: true,
      }
    );

    return res.json(updatedPrompt);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

// @route   DELETE /api/prompts/:promptId/delete
// @desc    Delete a prompt
// @access  Admin
router.delete("/:promptId/delete", requiresAuth, async (req, res) => {
  try {
    const prompt = await Prompts.findOne({
      _id: req.params.promptId,
    });

    if (!prompt) {
      return res.status(404).json({ error: "Could not find prompt" });
    }

    await Prompts.findByIdAndRemove({
      _id: req.params.promptId,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

export default router;
