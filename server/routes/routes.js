const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

// Route to fetch images
router.get("/images", (req, res) => {
  const query = "SELECT * FROM images";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching images:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

// Route to insert images
router.post("/images", (req, res) => {
  const { imageUrl, title, description } = req.body;
  const query =
    "INSERT INTO images (image_url, title, description) VALUES (?, ?, ?)";
  db.query(query, [imageUrl, title, description], (err, results) => {
    if (err) {
      console.error("Error inserting image:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Image inserted successfully" });
  });
});

// Route to update images
router.put("/images/:id", (req, res) => {
  const { imageUrl, title, description } = req.body;
  const imageId = req.params.id;
  const query =
    "UPDATE images SET image_url = ?, title = ?, description = ? WHERE id = ?";
  db.query(query, [imageUrl, title, description, imageId], (err, results) => {
    if (err) {
      console.error("Error updating image:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Image updated successfully" });
  });
});

// Route to delete images
router.delete("/images/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "DELETE FROM images WHERE id=?";

  db.query(query, imageId, (err, results) => {
    if (err) {
      console.error("Error deleting image:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ message: "Image deleted successfully" });
  });
});

// Search single photo
router.get("/images/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT * FROM images WHERE id=?";
  db.query(query, imageId, (err, results) => {
    if (err) {
      console.error("Error finding image:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results[0]);
  });
});

module.exports = router;
