
const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const { removeUser } = require("../service/auth");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);


router.get("/logout", (req, res) => {
    res.clearCookie("uid"); 
    return res.redirect("/"); 
  });

module.exports = router;
