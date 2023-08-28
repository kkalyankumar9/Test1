const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/usermodel");

const userRoutes = express.Router();

userRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ payload: "webcam" }, "app");
        return res.status(200).json({
          msg: "Login successful",
          token: token,
        });
      } else {
        return res.status(400).json({ err: "Password does not match" });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ name, email, password: hashedPassword });
      await newUser.save();
      return res.status(200).json({ msg: "User registered successfully" });
    }
  } catch (error) {
    return res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = { userRoutes };
