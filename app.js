// Add these functions for signup and login

function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.status);
  });
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.status);
    if (data.user) {
      // Hide login screen and show chat screen
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('chat-screen').style.display = 'block';

      // Set the current user for sending messages
      currentUsername = data.user.username;
    }
  });
}

// Modify sendMessage function to include the current user

let currentUsername;

function sendMessage() {
  const message = document.getElementById('message-input').value;

  if (currentUsername && message) {
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: currentUsername,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('message-input').value = '';
      getMessages();
    });
  } else {
    alert('Please enter a message.');
  }
}

// Modify getMessages function to display username in a separate element

function getMessages() {
  fetch('http://localhost:3000/messages')
  .then(response => response.json())
  .then(data => {
    const chatBox = document.getElementById('chat-box');
    const userElement = document.getElementById('current-user');
    chatBox.innerHTML = '';

    data.messages.forEach(msg => {
      const messageElement = document.createElement('div');
      const formattedTimestamp = new Date(msg.timestamp).toLocaleString();
      messageElement.textContent = `[${formattedTimestamp}] ${msg.username}: ${msg.message}`;
      chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight;

    // Display the current user
    userElement.textContent = `Current User: ${currentUsername}`;
  });
}

// Hide chat screen initially
document.getElementById('chat-screen').style.display = 'none';
