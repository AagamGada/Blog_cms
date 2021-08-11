const adminMiddleware = (req, res, next) => {
  const { role } = req.user;
  if (role.trim() !== "admin") {
    return res.status(401).json({ msg: "Not authorized" });
  }
  next();
};

module.exports = adminMiddleware;
