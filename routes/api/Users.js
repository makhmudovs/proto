const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validateRegistration, validateLogin } = require("./validate");

//User Model
const User = require("../../models/User");

//@route GET api/users
//@desc Get all users
//@access PUBLIC
router.get("/", async (req, res) => {
  const user = await User.find().sort({ date: -1 });
  res.send(user);
});

//@route POST api/users
//@desc POST create a  user
//@access PUBLIC
router.post("/", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send({ error: "something went wrong" });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res
      .status(401)
      .send({ error: "user with this email already exists" });

  //hashing password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
  });

  const newUser = await user.save().then(() => {
    res.status(201).send({ user: user._id, name: user.username });
  });
});

module.exports = router;
