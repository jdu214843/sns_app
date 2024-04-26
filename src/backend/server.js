const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asilbek",
  database: "signup",
});

// Sign up
app.post("/signup", (req, res) => {
  const { fullname, username, email, password } = req.body;
  const sql =
    "INSERT INTO login (`fullname`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)";
  const values = [fullname, username, email, password];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error signing up:", err);
      return res.status(500).json({ error: "Error signing up" });
    }
    return res.json({ message: "Signed up successfully" });
  });
});

// Sign in
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (data.length > 0) {
      const { id, username, fullname, email } = data[0];
      return res.json({
        status: "success",
        user: { id, username, fullname, email },
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});

// Save image URL
app.post("/saveImageUrl", (req, res) => {
  const imageUrl = req.body.imageUrl;

  // Save the imageUrl to your database here
  // This is a placeholder and will depend on how your database is set up
  // db.save(imageUrl);

  res.status(200).send({ message: "Image URL saved successfully" });
});

// Upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/uploadImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  const imageUrl = req.file.path;

  const sql = "INSERT INTO imgs (image_url) VALUES (?)";
  db.query(sql, [imageUrl], (err, result) => {
    if (err) {
      console.error("Error saving image URL to database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Image URL saved to database");
    return res.status(200).json({ message: "Image URL saved to database" });
  });
});

// Endpoint to serve images
app.get("/uploads/:id", (req, res) => {
  const imageId = req.params.id;

  db.query("SELECT * FROM imgs WHERE id = ?", [imageId], (err, result) => {
    if (err) {
      console.error("Error fetching image:", err);
      return res.status(500).json({ error: "Error fetching image" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imagePath = result[0].image_url;

    res.sendFile(path.join(__dirname, imagePath));
  });
});

// posts
app.post("/posts", (req, res) => {
  const { text, username } = req.body; // Assuming the username is sent along with the request body
  const sql = "INSERT INTO posts (text, username) VALUES (?, ?)";
  const values = [text, username];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error posting:", err);
      return res.status(500).json({ error: "Error posting" });
    }
    return res.json({ message: "Post created successfully" });
  });
});
// posts
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, postId, (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ error: "Error deleting post" });
    }
    return res.json({ message: "Post deleted successfully" });
  });
});

// Profile endpoint
app.get("/profile", (req, res) => {
  const userId = req.query.userId; // Assuming userId is passed as a query parameter
  const sql = "SELECT * FROM login WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ error: "Error fetching user profile" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userProfile = {
      id: result[0].id,
      fullname: result[0].fullname,
      username: result[0].username,
      email: result[0].email,
    };
    res.status(200).json(userProfile);
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
