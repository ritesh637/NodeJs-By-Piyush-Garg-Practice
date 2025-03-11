const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const jwt = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  
  const generatedToken = jwt.sign({ ...user }, "", {
    expiresIn: "1h",
  });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  res.cookie("token", generatedToken);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
