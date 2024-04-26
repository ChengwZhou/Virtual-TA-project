const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// config MySQL connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '20000827',
  database: 'user_db'
});

// register
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Check if the username is already taken
  pool.query('SELECT COUNT(*) AS cnt FROM users WHERE username = ?', [username], (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).send('Internal server error');
      }
      if (results[0].cnt > 0) {
          return res.status(409).send('Username is already taken!');
      }
      // Check if the email is already registered
      pool.query('SELECT COUNT(*) AS cnt FROM users WHERE email = ?', [email], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).send('Internal server error');
          }
          if (results[0].cnt > 0) {
              return res.status(409).send('Email is already registered!');
          }
          // Proceed to insert the new user
          bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                  console.error(err);
                  return res.status(500).send('Error hashing the password');
              }
              pool.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hash, email], (error, results) => {
                  if (error) {
                      console.error(error);
                      return res.status(500).send('Internal server error');
                  }
                  res.status(201).send('User registered');
              });
          });
      });
  });
});

// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) return res.status(500).send(error);
    if (results.length == 0) return res.status(404).send('User not found');
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if (!isMatch) return res.status(401).send('Password incorrect');
      
      const token = jwt.sign({ id: results[0].id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).send({ token });
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
