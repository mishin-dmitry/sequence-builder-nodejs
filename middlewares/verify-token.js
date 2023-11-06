const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.cookies._sid;

  if (!token) {
    // Если передали куки в getServerSideProps
    if (req.headers.cookies?.includes("_sid")) {
      const splittedCookies = req.headers.cookies.split(";");
      const tokenString = splittedCookies.find((cookieString) =>
        cookieString.trim().startsWith("_sid")
      );

      if (tokenString) {
        const [_, sid] = tokenString.split("=");

        token = sid;
      } else {
        next();
      }
    } else {
      return next();
    }
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next();
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
