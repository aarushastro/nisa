function checkLogin() {
    const enteredUsername = document.getElementById('login-username').value;
    const enteredPassword = document.getElementById('login-password').value;

    // Check if the entered username is 'aruz' and password is 'success'
    if (enteredUsername.toLowerCase() === 'aruz' && enteredPassword === 'success') {
        document.getElementById('login-message').innerHTML = 'Login successful!';
        document.getElementById('login-message').style.color = 'green';
    } else {
        document.getElementById('login-message').innerHTML = 'Login failed. Please try again.';
        document.getElementById('login-message').style.color = 'red';
    }
}

// Function for signup (you can implement this as needed)
function signup() {
    // Placeholder for signup functionality
    document.getElementById('signup-message').innerHTML = 'Signup functionality coming soon!';
    document.getElementById('signup-message').style.color = 'white';
}
