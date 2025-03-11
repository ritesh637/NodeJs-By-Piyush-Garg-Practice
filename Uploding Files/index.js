const path = require("path");
const express = require("express");
// const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
    // cb(null, `${uuidv4()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Server homepage
app.get("/", (req, res) => {
  return res.render("homepage");
});

// Handle multiple file uploads
app.post("/upload", upload.array("profileImage", 5), (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.send("No files uploaded!"); // Message if no files are uploaded
  }

  console.log(req.body);
  console.log(req.files);

  res.send("Files uploaded successfully!"); // Message if files are uploaded
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
