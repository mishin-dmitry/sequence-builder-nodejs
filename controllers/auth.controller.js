const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Регистрация
const signup = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      res.status(200).send({ error: "User already exists" });

      return;
    }

    user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.cookie("_sid", token);

    res.status(201).send({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).send({ error: "Cannot create user" });
  }
};

// Авторизация
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(200).send({ error: "Invalid password or email" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(200).send({
        error: "Invalid password or email",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.cookie("_sid", token);

    return res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch {
    return res.status(500).send({ error: "Error during login" });
  }
};

// Разлогин
const logout = async (req, res) => {
  try {
    req.session = null;

    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (error) {
    this.next(error);
  }
};

module.exports = { signup, login, logout };
