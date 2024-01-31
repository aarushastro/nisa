function checkPassword() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    if (enteredUsername.toLowerCase() === 'aruz' && enteredPassword === 'success') {
        document.getElementById('login-message').innerHTML = 'Login successful!';
        document.getElementById('login-message').style.color = 'green';
    } else {
        document.getElementById('login-message').innerHTML = 'Login failed. Please try again.';
        document.getElementById('login-message').style.color = 'red';
    }
}

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message-input').value;

    if (username && message) {
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
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
        alert('Please enter both username and message.');
    }
}

function getMessages() {
    fetch('http://localhost:3000/messages')
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = '';

        data.messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${msg.username}: ${msg.message}`;
            chatBox.appendChild(messageElement);
        });

        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

getMessages();
setInterval(getMessages, 3000);
