const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  author: String,
  text: String,
});

module.exports = mongoose.model("Quote", quoteSchema);
