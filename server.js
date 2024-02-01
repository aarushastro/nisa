const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Set up MySQL database
const db = mysql.createConnection({
    host: 'sql305.infinityfree.com',
    user: 'if0_35493069',
    password: 'wg03m2dv',
    database: 'if0_35493069_subdivision'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Handle GET request to retrieve messages
app.get('/messages', (req, res) => {
    const sql = 'SELECT * FROM messages';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching messages from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ messages: result });
        }
    });
});

// Handle POST request to store messages
app.post('/messages', (req, res) => {
    const { username, message, timestamp } = req.body;
    const sql = 'INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)';

    db.query(sql, [username, message, timestamp], (err, result) => {
        if (err) {
            console.error('Error storing message in MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ status: 'Message sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
