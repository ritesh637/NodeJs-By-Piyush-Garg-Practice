// const express = require("express");
// const fs = require("fs");
// const users = require("./MOCK_DATA.json");

// const app = express();
// const PORT = 5000;

// // middleware - plugin for same data passing through ...
// // app.use(express.urlencoded({ extended: false }));

// // Route
// // for find the user fist name
// app.get("/users", (req, res) => {
//   const html = `
//   <ul>
//        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//   </ul>
//   `;
//   res.send(html);
// });

// // find the all user lists jo hai sub dikh do for used this command

// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });
// //  find some user using this command DYNAMICALLY and see particularly for id like 85,86,87,89,90......
// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   .patch((req, res) => {
//     return res.json({ status: "success" });
//   })
//   .delete((req, res) => {
//     return res.json({ status: "Pending" });
//   });

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   users, push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     return res.json({ status: "User created successfully" });
//   });

//   //   console.log("Body", body);
//   //   return res.json({ status: "User created successfully" });
// });

// app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mock Data
let users = require("./MOCK_DATA.json");

// POST Route to Add a New User
app.post("/api/users", (req, res) => {
  const body = req.body;

  // Validate Request Body
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Add User to Array
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  // Save to File
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving data" });
    }
    res
      .status(201)
      .json({ status: "User created successfully", user: newUser });
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
