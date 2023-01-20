import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import validateRegisterInput from "../routes/validation/registerValidation.js";

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
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (existingEmail) {
      return res.status(400).json({ error: "There is already a user with this email" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPassword);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    const savedUser = await newUser.save();

    return res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;
