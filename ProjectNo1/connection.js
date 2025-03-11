const mongoose = require("mongoose");

// Connection
async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
