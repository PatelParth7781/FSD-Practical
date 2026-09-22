const express = require("express");
const { getMuseums, createMuseum, updateMuseum, deleteMuseum } = require("../controllers/museumController");

const router = express.Router();

router.get("/", getMuseums);
router.post("/", createMuseum);
router.put("/:id", updateMuseum);
router.delete("/:id", deleteMuseum);

module.exports = router;
