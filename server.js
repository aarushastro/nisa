body {
    font-family: monospace;
    letter-spacing: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #1c1c1c;
}

#login-form {
    color: white;
    text-align: center;
    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 35%, rgba(39, 39, 39, 1) 100%);
    margin: inherit;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#login-message {
    margin: 20px;
}

input {
    padding: 12px;
    margin: 8px 0;
    color: #333;
    width: 100%;
    background-color: #444;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
}

#login_btn {
    background-color: #ffcc80;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: white;
    box-shadow: 0 0 5px #ffcc80, 0 0 5px #ffcc80, 0 0 10px #ffcc80;
}

#login_btn:hover {
    background-color: #ffaa5c;
    box-shadow: 0 0 5px #ffaa5c, 0 0 5px #ffaa5c, 0 0 10px #ffaa5c;
}

#username,
#password {
    padding: 12px;
    margin: 8px 0;
    color: #eee;
    width: 100%;
    background-color: #333;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
}

#title {
    color: white;
}
