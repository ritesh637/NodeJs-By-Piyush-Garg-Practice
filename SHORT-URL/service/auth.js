const jwt = require("jsonwebtoken");

const SECRET_KEY = "";
const sessionIdToUserMap = new Map();

const generateToken = (user) =>
  jwt.sign(user, SECRET_KEY, { expiresIn: "20m" });

const handleLogin = (req, res) => {
  const user = req.body.user;
  if (!user) return res.status(400).json({ error: "User data required" });
};

const setUser = (id, user) => sessionIdToUserMap.set(id, user);
const getUser = (id) => sessionIdToUserMap.get(id);
const removeUser = (id) => sessionIdToUserMap.delete(id);

const restrictToLoggedinUserOnly = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  try {
    req.user = getUser(jwt.verify(token, SECRET_KEY).userId);
    if (!req.user) return res.redirect("/login");
    next();
  } catch (error) {
    res.status(error.name === "TokenExpiredError" ? 401 : 403).json({
      error:
        error.name === "TokenExpiredError"
          ? "Token expired. Please log in again."
          : "Invalid token. Access denied.",
    });
  }
};

const checkAuth = (req, res, next) => {
  try {
    req.user = getUser(jwt.verify(req.cookies?.token, SECRET_KEY)?.userId);
  } catch {
    req.user = null;
  }
  res.locals.user = req.user;
  next();
};

module.exports = {
  generateToken,
  handleLogin,
  setUser,
  getUser,
  removeUser,
  restrictToLoggedinUserOnly,
  checkAuth,
};
