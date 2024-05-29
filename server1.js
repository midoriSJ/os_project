const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'elskvhfh12',
  database: 'paragliding_db',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

const transporter = nodemailer.createTransport({
  service: 'naver',
  auth: {
    user: 'nskfn02@naver.com',
    pass: 'elskvhfh12',
  },
});

app.post('/send-verification-code', (req, res) => {
  const { email, code } = req.body;
  const mailOptions = {
    from: 'nskfn02@naver.com',
    to: email,
    subject: '글라이드메이트(GlideMate) 회원가입 이메일 인증번호입니다.',
    text: `인증번호 : ${code}\n인증번호 칸에 정확히 입력해 주세요.\n감사합니다.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  });
});

app.post('/check-duplicate', (req, res) => {
  const { id } = req.body;
  const query = 'SELECT COUNT(*) AS count FROM users WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      const isDuplicate = results[0].count > 0;
      res.json({ isDuplicate });
    }
  });
});

app.post('/signup', (req, res) => {
  const { id, pw, name, birth, phone, email } = req.body;
  const query = 'INSERT INTO users (id, pw, name, birth, phone, email) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, pw, name, birth, phone, email], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, error });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/login', (req, res) => {
  const { id, pw } = req.body;
  const query = 'SELECT pw FROM users WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, error });
    } else {
      if (results.length === 0) {
        res.json({ success: false, error: 'invalid_id' });
      } else {
        const user = results[0];
        if (user.pw !== pw) {
          res.json({ success: false, error: 'invalid_pw' });
        } else {
          res.json({ success: true });
        }
      }
    }
  });
});

app.get('/recent-posts', (req, res) => {
  const query = 'SELECT boardType, title FROM posts ORDER BY createdAt DESC LIMIT 10';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
