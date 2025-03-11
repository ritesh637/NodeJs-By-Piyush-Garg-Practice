const express = require("express");
const { handleGetAllUsers, getUserById } = require("../controllers/user");
const routers = express.Router();

// REST API
router.get("/", handleGetAllUsers);

router
  .route("/:id")
  .get(async (req, res) => {})
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success " });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

router.post("/", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "success" });
});

module.exports = router;
