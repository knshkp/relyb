const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];
  
  if (!token) {
    return res.status(401).send({ success: false, msg: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, config.secret_jwt);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
