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
// signi function started
app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO login (`fullname`,`username`, `email`, `password`) VALUES (?)";
  const values = [
    req.body.fullname,
    req.body.username,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/signin", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("error");
    }
    if (data.length > 0) {
      let { id, username, fullname, email } = data[0];
      return res.json({
        status: "success",
        user: {
          id,
          username,
          fullname,
          email,
        },
      });
    } else {
      return res.json("Faile");
    }
  });
});

// sign function end

// img upload function start
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
  return res.send("File uploaded successfully.");
});
// img upload function end

app.listen(8081, () => {
  console.log("connection established");
});
