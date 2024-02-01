function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.toggle('show');
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Save user data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Close the signup popup
    togglePopup('signup-form');
}

function checkPassword() {
    const enteredUsername = document.getElementById('login-username').value;
    const enteredPassword = document.getElementById('login-password').value;

    // Retrieve stored user data
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        document.getElementById('login-message').innerHTML = 'Login successful!';
        document.getElementById('login-message').style.color = 'green';
    } else {
        document.getElementById('login-message').innerHTML = 'Login failed. Please try again.';
        document.getElementById('login-message').style.color = 'red';
    }
}
