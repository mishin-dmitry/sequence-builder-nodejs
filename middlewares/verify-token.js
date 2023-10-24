const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies._sid;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next();
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
