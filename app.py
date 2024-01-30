from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/messages', methods=['GET', 'POST'])
def chat():
    global messages

    if request.method == 'POST':
        username = request.json['username']
        message = request.json['message']

        messages.append({'username': username, 'message': message})
        return jsonify({'status': 'Message sent successfully'})

    elif request.method == 'GET':
        return jsonify({'messages': messages})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
