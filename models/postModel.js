const db = require('../db');

const Post = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create: (post) => {
    return new Promise((resolve, reject) => {
      const { title, content, userId } = post;
      db.run(
        "INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)",
        [title, content, userId],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...post });
        }
      );
    });
  },

  update: (id, post) => {
    return new Promise((resolve, reject) => {
      const { title, content } = post;
      db.run(
        "UPDATE posts SET title = ?, content = ? WHERE id = ?",
        [title, content, id],
        function (err) {
          if (err) reject(err);
          else resolve({ updated: this.changes });
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes });
      });
    });
  }
};

module.exports = Post;
