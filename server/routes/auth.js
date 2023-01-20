import express from "express";

import User from "../models/User.js";

const router = express.Router();

// @route GET /api/auth/test
// @desc Test the auth route
// @access Public
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// @route POSE /api/auth/register
// @desc Create a new user
// @access Public
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      //   password: req.body.password,
      name: req.body.name,
    });

    const savedUser = await newUser.save();

    return res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(err.message);
  }
});

export default router;
