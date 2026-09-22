const Museum = require("../models/Museum");

const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();
    res.status(200).json(museums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMuseum = async (req, res) => {
  try {
    const museum = await Museum.create(req.body);
    res.status(201).json(museum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMuseum = async (req, res) => {
  try {
    const museum = await Museum.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!museum) {
      return res.status(404).json({ message: "Museum not found" });
    }
    res.status(200).json(museum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMuseum = async (req, res) => {
  try {
    const museum = await Museum.findByIdAndDelete(req.params.id);
    if (!museum) {
      return res.status(404).json({ message: "Museum not found" });
    }
    res.status(200).json({ message: "Museum deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMuseums, createMuseum, updateMuseum, deleteMuseum };
