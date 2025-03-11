const express = require("express");
const fs = require("fs");
const statusMonitor = require("express-status-monitor");
const zlib = require("zlib");

const app = express();
const PORT = 8000;
app.use(statusMonitor());


fs.createReadStream("20M.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("20M.txt.gz"));

app.get("/", (req, res) => {
  const stream = fs.createReadStream("20M.txt", "utf-8");

  stream.pipe(res); 
  stream.on("error", (err) => {
    res.status(500).send("Error reading file.");
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
