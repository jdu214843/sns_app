const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "StrongPassword123!",
  database: "signup",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?)";
  const values = [req.body.username, req.body.email, req.body.password];
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
      return res.json("Success");
    } else {
      return res.json("Faile");
    }
  });
});

app.listen(8081, () => {
  console.log("connection established");
});
