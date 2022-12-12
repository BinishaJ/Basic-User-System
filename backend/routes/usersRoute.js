const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");

//Registration
router.post("/register", async (req, res) => {
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //dupliate email
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send("User with email already exists!");

  //hash password
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  //create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  //validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User doesn't exist!");

  //compare hashed password
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd) return res.status(400).send("Invalid Password!");

  res.send({ id: user._id });
});

module.exports = router;
