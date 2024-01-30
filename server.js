const express = require('express');
const cors = require('cors');

const app = express();
const port = 21982;

app.use(cors());
app.use(express.json());

let messages = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// In server.js
app.route('/messages')
  .get((req, res) => {
    console.log('GET /messages');
    res.json({ messages });
  })
.post((req, res) => {
    console.log('POST /messages', req.body);
    const { username, message } = req.body;
    messages.push({ username, message });
    res.json({ status: 'Message sent successfully' });
  });

app.route('/messages')
  .get((req, res) => {
    res.json({ messages });
  })
  .post((req, res) => {
    const { username, message } = req.body;
    messages.push({ username, message });
    res.json({ status: 'Message sent successfully' });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
