const db = require("../models");
const User = db.users;

const checkUserExisting = async (req, res, next) => {
  try {
    if (!req.userId) {
      return next();
    }

    const user = await User.findOne({ where: { id: req.userId } });

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = { checkUserExisting };
