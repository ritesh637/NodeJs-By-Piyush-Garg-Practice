const express = require("express");
const app = express();
const port = 5000;

// Middleware function to log request
const requestLogger = (req, res, next) => {
  if (req.method === "GET") {
    console.log(`GET Request: ${req.url} - ${new Date().toISOString()}`);
  } else if (req.method === "POST") {
    console.log(
      `POST Request: ${
        req.url
      } - ${new Date().toISOString()} - Body: ${JSON.stringify(req.body)}`
    );
  } else {
    console.log(
      `Other Request Type (${req.method}): ${
        req.url
      } - ${new Date().toISOString()}`
    );
  }
  next(); // Pass control to the next middleware or route handler
};

// Use the middleware globally
app.use(express.json()); // Middleware to parse JSON body
app.use(requestLogger);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World! Middleware is working.");
});

// Another route with condition
app.post("/data", (req, res) => {
  res.send("POST request received.");
});

// Additional route to test PUT request
app.put("/update", (req, res) => {
  res.send("PUT request received.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
