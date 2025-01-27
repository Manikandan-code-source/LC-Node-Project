const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided!" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "your_secret_key", (err, decoded) => {

    if (err) {
      console.log(err.message);

      return res.status(403).json({ message: "Invalid or expired token!" });
    }
    req.user = decoded;
    if(decoded.role === 'admin') {
      return next();
     } else {
      return res.status(403).json({ message: "Unauthorized" });
     }
  });
};

module.exports = verifyToken;
