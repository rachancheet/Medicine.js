const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");
const multer = require("multer");
const path = require("path");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const medicine = new Medicine({
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read (with search, filtering, and sorting)
router.get("/", async (req, res) => {
  try {
    let query = Medicine.find();

    // Search
    if (req.query.search) {
      query = query.regex("name", new RegExp(req.query.search, "i"));
    }

    // Filtering
    const filters = ["price", "quantity", "manufacturer"];
    filters.forEach((filter) => {
      if (req.query[filter]) {
        query = query.where(filter).equals(req.query[filter]);
      }
    });

    // Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    const medicines = await query.exec();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update
router.patch("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
