const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asilbek",
  database: "sns",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload Image
app.post("/uploadImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  const image = req.file.filename;
  const { user_id } = req.body;

  const sql = "UPDATE User SET image = ? WHERE id = ?";
  db.query(sql, [image, user_id], (err, result) => {
    if (err) {
      console.error("Error saving image URL to database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    console.log("Image URL saved to database");
    return res.status(200).json({
      message: "Image URL saved to database",
    });
  });
});
// get image
app.get("/", (req, res) => {
  const sql = "SELECT * FROM User";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: " error" });
    return res.json(result);
  });
});
// Register
app.post("/signup", (req, res) => {
  const { full_name, username, email, password } = req.body;

  const sql =
    "INSERT INTO User (`full_name`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)";
  const values = [full_name, username, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error signing up:", err);
      return res.status(500).json({ error: "Error signing up" });
    }
    return res.json({ message: "Signed up successfully" });
  });
});

// LogIn
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM User WHERE `email` = ? AND `password` = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (data.length > 0) {
      const { id, username, full_name, email, image } = data[0];
      return res.json({
        status: "success",
        user: {
          id,
          username,
          full_name,
          email,
          image: image ? image : "default.png",
        },
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});

// Endpoint to fetch user profile data
app.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Run the query to fetch user profile data
    const [rows] = await connection.execute(
      "SELECT username, full_name, id, image FROM User WHERE id = ?",
      [userId]
    );

    // Release the connection
    connection.release();

    // Check if user exists
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the fetched data as JSON response
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Profile
app.put("/profile", (req, res) => {
  const { user_id, full_name, username } = req.body;

  const sql = "UPDATE User SET full_name = ?,username = ? WHERE id = ?";
  db.query(sql, [full_name, username, user_id], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  });
});

// Create Post
app.post("/post", (req, res) => {
  const { text, user_id } = req.body; // Assuming the username is sent along with the request body
  const sql = "INSERT INTO Post (text, user_id) VALUES (?, ?)";
  const values = [text, user_id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error posting:", err);
      return res.status(500).json({ error: "Error posting" });
    }
    console.log(result);
    return res.json({
      message: "Post created successfully",
      post_id: result.insertId,
    });
  });
});

// Delete Post
app.delete("/post/:id", (req, res) => {
  const postId = req.params.id; // Extract post_id from URL parameters
  const userId = req.query.user_id; // Extract user_id from query parameters

  const sql = "DELETE FROM Post WHERE id = ? AND user_id = ?";
  db.query(sql, [postId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ error: "Error deleting post" });
    }
    if (result.affectedRows === 0) {
      // If no rows were affected, it means the post was not found or the user is not authorized to delete it
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }
    return res.json({ message: "Post deleted successfully" });
  });
});

// Update Post
app.put("/post/:id", (req, res) => {
  const postId = req.params.id;
  const { user_id, text } = req.body;

  const sql = "UPDATE Post SET text = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [text, postId, user_id], (err, result) => {
    if (err) {
      console.error("Error updating post:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      // No rows were affected, indicating that the post was not updated
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
    });
  });
});

app.post("/posts", (req, res) => {
  const sql =
    "SELECT p.id, p.text, u.full_name, u.username, COALESCE(u.image, 'default.png') AS image, b.status AS bookmark_status, " +
    "EXISTS(SELECT 1 FROM `Like` AS l WHERE l.post_id = p.id AND l.user_id = ?) AS like_status, " +
    "GROUP_CONCAT(c.text) AS comments " +
    "FROM Post AS p " +
    "INNER JOIN User AS u ON u.id = p.user_id " +
    "LEFT JOIN Bookmark AS b ON b.post_id = p.id AND b.user_id = ? " +
    "LEFT JOIN Comment AS c ON c.post_id = p.id " +
    "GROUP BY p.id, p.text, u.full_name, u.username, u.image, b.status " +
    "ORDER BY p.id DESC";

  db.query(sql, [req.body.user_id, req.body.user_id], (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (result.length > 0) {
      // Process comments and format response
      const formattedResult = result.map((post) => {
        const formattedPost = {
          id: post.id,
          text: post.text,
          full_name: post.full_name,
          username: post.username,
          image: post.image,
          bookmark_status: post.bookmark_status,
          like_status: post.like_status,
          replies: [], // Initialize empty array for comments
        };

        // Check if comments exist
        if (post.comments) {
          // Split concatenated comments into an array
          const commentsArray = post.comments.split(",");
          // Add each comment to the replies array
          formattedPost.replies = commentsArray.map((comment) => ({
            text: comment,
          }));
        }

        return formattedPost;
      });

      return res.json({
        status: "success",
        posts: formattedResult,
      });
    } else {
      return res.status(200).json({ error: "Post not found" });
    }
  });
});

// Create Comment
app.post("/comment", (req, res) => {
  const { text, post_id, user_id } = req.body;
  const sql = "INSERT INTO Comment (text, user_id, post_id) VALUES (?, ?, ?)";
  const values = [text, user_id, post_id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error posting:", err);
      return res.status(500).json({ error: "Error commenting" });
    }
    return res.json({
      message: "Comment created successfully",
      comment_id: result.insertId,
    });
  });
});

// Delete Comment
app.delete("/comment", (req, res) => {
  const { comment_id, user_id } = req.body;
  const sql = "DELETE FROM Comment WHERE id = ? and user_id = ?";
  db.query(sql, [comment_id, user_id], (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ error: "Error deleting comment" });
    }
    return res.json({ message: "Comment deleted successfully" });
  });
});

// Update Comment
app.put("/comment", (req, res) => {
  const { user_id, comment_id, text } = req.body;

  const sql = "UPDATE Comment SET text = ? WHERE id = ? AND user_id = ?";
  db.query(sql, [text, comment_id, user_id], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({
      message: "Comment updated successfully",
    });
  });
});

// Get Comment
app.get("/comment/:post_id", (req, res) => {
  const sql =
    "SELECT c.id,c.text,u.full_name,u.username,COALESCE(u.image, 'default.png') AS image FROM Comment AS c INNER JOIN User AS u ON u.id = c.user_id WHERE c.post_id = ?";
  db.query(sql, req.params.post_id, (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (result.length > 0) {
      return res.json({
        status: "success",
        comments: result,
      });
    } else {
      return res.status(200).json({ error: "Comment not found" });
    }
  });
});

// Set Like
app.post("/like", (req, res) => {
  const { user_id, post_id, action } = req.body;
  const sql = "SELECT * FROM `Like` WHERE `post_id` = ? AND `user_id` = ?";
  const actionStatus = action == "true" ? false : true;
  db.query(sql, [post_id, user_id], (err, data) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (data.length > 0) {
      const sql =
        "UPDATE `Like` SET status = ? WHERE post_id = ? AND user_id = ?";
      db.query(sql, [actionStatus, post_id, user_id], (err, data) => {
        if (err) {
          console.error("Error Like:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({
          message: "Liked successfully",
        });
      });
    } else {
      const sql =
        "INSERT INTO `Like` (user_id, post_id,status) VALUES (?, ?, ?)";
      db.query(sql, [user_id, post_id, actionStatus], (err, data) => {
        if (err) {
          console.error("Error Like:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({
          message: "Liked successfully",
        });
      });
    }
  });
});

// Set Bookmark
app.post("/bookmark", (req, res) => {
  const { user_id, post_id, action } = req.body;
  const sql = "SELECT * FROM `Bookmark` WHERE `post_id` = ? AND `user_id` = ?";
  const actionStatus = action == "true" ? true : false;
  db.query(sql, [post_id, user_id], (err, data) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (data.length > 0) {
      const sql =
        "UPDATE `Bookmark` SET status = ? WHERE post_id = ? AND user_id = ?";
      db.query(sql, [actionStatus, post_id, user_id], (err, data) => {
        if (err) {
          console.error("Error Like:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({
          message: "Bookmark successfully",
        });
      });
    } else {
      const sql =
        "INSERT INTO `Bookmark` (user_id, post_id,status) VALUES (?, ?, ?)";
      db.query(sql, [user_id, post_id, actionStatus], (err, data) => {
        if (err) {
          console.error("Error Like:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({
          message: "Bookmark successfully",
        });
      });
    }
  });
});

// Unbookmark Post
app.post("/unbookmark", (req, res) => {
  const { user_id, post_id } = req.body;

  const sql = "DELETE FROM `Bookmark` WHERE `user_id` = ? AND `post_id` = ?";
  db.query(sql, [user_id, post_id], (err, data) => {
    if (err) {
      console.error("Error unbookmarking post:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "post unbookmarked successfully" });
  });
});

// Get Bookmark List
app.post("/myBookmark", (req, res) => {
  const { user_id } = req.body;
  const sql = `SELECT p.id,p.text,u.full_name,u.username,COALESCE(u.image, 'default.png') AS image 
                        FROM Bookmark AS b
                        INNER JOIN Post AS p ON b.post_id = p.id
                        INNER JOIN User AS u ON u.id = p.user_id
                        WHERE b.user_id = ? ORDER by p.id DESC`;
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (result.length > 0) {
      return res.json({
        status: "success",
        posts: result,
      });
    } else {
      return res.status(200).json({ error: "Bookmarks not found" });
    }
  });
});

// My Messages
app.post("/myPost", (req, res) => {
  const { user_id } = req.body;
  const sql = `SELECT p.id,p.text,u.full_name,u.username,COALESCE(u.image, 'default.png') AS image,b.status FROM Post AS p
            INNER JOIN User AS u ON u.id = p.user_id LEFT JOIN Bookmark AS b ON b.post_id = p.id
            WHERE p.user_id = ?`;
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error signing in:", err);
      return res.status(500).json({ error: "Error signing in" });
    }
    if (result.length > 0) {
      return res.json({
        status: "success",
        posts: result,
      });
    } else {
      return res.status(200).json({ error: "Bookmarks not found" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
