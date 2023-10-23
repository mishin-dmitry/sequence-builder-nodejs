const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies._sid;

  if (!token) {
    return res.status(200).send({
      error: "No token provided",
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(200).send({
        error: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
