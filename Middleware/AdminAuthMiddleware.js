const authMiddleware = (req, res, next) => {
 const {user} = req.body;
 if(user === 'admin') {
  return next();
 } else {
  return res.status(403).json({ message: "Unauthorized" });
 }
};

module.exports = authMiddleware;