const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

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

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
