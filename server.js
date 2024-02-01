const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let users = [];
let messages = [];

app.route('/signup')
  .post((req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    if (users.find(user => user.username === username)) {
      res.json({ status: 'Username already taken' });
    } else {
      // Add the user to the users array
      users.push({ username, password });
      res.json({ status: 'User created successfully' });
    }
  });

app.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;

    // Check if the username and password match
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      res.json({ status: 'Login successful', user: { username } });
    } else {
      res.json({ status: 'Invalid username or password' });
    }
  });

app.route('/messages')
  .get((req, res) => {
    console.log('GET /messages');
    res.json({ messages });
  })
  .post((req, res) => {
    console.log('POST /messages', req.body);
    const { username, message } = req.body;
    const timestamp = new Date().toISOString();
    messages.push({ username, message, timestamp });
    res.json({ status: 'Message sent successfully' });
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
