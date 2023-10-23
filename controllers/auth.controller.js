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
      res.status(409).send({ message: "User already exists" });
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

    req.session.token = token;

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Cannot create user" });
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
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      email: user.email,
    });
  } catch {
    return res.status(500).send({ message: "Error during login" });
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
