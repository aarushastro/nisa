const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let messages = [];

app.route('/messages')
  .get((req, res) => {
    console.log('GET /messages');
    res.json({ messages });
  })
  .post((req, res) => {
    console.log('POST /messages', req.body);
    const { username, message } = req.body;
    const timestamp = new Date().toISOString(); // Get current time in ISO 8601 format
    messages.push({ username, message, timestamp });
    res.json({ status: 'Message sent successfully' });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
