const jwt = require("jsonwebtoken");
const config = require("./keys");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization === undefined) {
    return res.status(401).json({ msg: "No authorization header" });
  }
  const token = authorization.split(" ")[1];
  if (token === undefined) {
    return res.status(401).json({ msg: "No token provided" });
  }
  jwt.verify(token, config.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ msg: "Token not valid" });
    }
    req.user = payload;
    next();
  });
};

module.exports = authMiddleware;
