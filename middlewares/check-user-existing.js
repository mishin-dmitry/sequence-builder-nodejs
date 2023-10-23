const db = require("../models");
const User = db.users;

const checkUserExisting = async (req, res, next) => {
  try {
    const user = User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send({
        message: "Email is already registered",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkUserExisting };
