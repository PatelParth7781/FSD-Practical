const mongoose = require("mongoose");

const museumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  year: { type: Number, required: true }
});

module.exports = mongoose.model("Museum", museumSchema);
