const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
require("dotenv").config();

const createAccessToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
module.exports = {
  async registerUser(req, res) {
    try {
      const errors = await validationResult(req);                                                                                 
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: errors.array().map((err) => err.msg) });
      }
      // check if identical email exist on the database
      let user = await User.findByEmail(req.body.email);
      if (user) {
        return res.status(400).json({ msg: "User already Exist" });
      }

      // encrypting password

      let saltRounds = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      //
      let newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      user = await newUser.save();
      let payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified,
      };
      let accessToken = createAccessToken(payload);

      // send the email verification
      res.status(201).json({ payload, accessToken });
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err);
    }
  },

  async loginUser(req, res) {
    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      let user = await User.findByEmail(req.body.email);

      if (user) {
        let passwordMatch = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        let payload = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: user.isVerified,
        };
        let accessToken = createAccessToken(payload);

        return res.status(200).json({ payload, accessToken });
      }
      res.status(400).json({ msg: "Invalid credentials" });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
  async fetchUser(req, res) {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  },
};
