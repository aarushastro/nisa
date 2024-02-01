const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = 3000;

// Replace the following path with the actual path to your serviceAccountKey.json file
const serviceAccount = {
  "type": "service_account",
  "project_id": "subdivision-45cdf",
  "private_key_id": "3460385e0d47b2e6850aa17544ab711e13686c5b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCerjlyuJ+7hiSB\nQZheQpSONFkE6N4N5Ih3kG1KVORBzZHdrA3zGwSbdhE9UwBceZ7Nsumjbu7Aa98m\nWlFQBrqrrsypqvYwvCzQPJ89tjdQSH1+yh1VGG5A/i7WteyLPvh/UBOrlO/QrRoO\n0N2EXh9Sb2V0NURZglVpa5/8eBgIrQEkq4bfzGKkOWuwZqf8ReBJOj+xUWCiKoKN\n4IGr1Ol1YOOK+NUqKmB6Ytpj4fRbN1xs7GjnABKb4RO9QEnm8RsVWJ9idy22CXBW\nNxW7m/VjRSS6pCQHbTMVilllcXTYl4AZgctJ+t6mo0TLTt4rhWWx3j4Q0HmvyBFC\nNGRr7ZcnAgMBAAECggEAFX7ojV/xU4fyfggSygIe+byhqoaZPiyNSBUqmP0zBq8A\naZUbNqmcUCsIXtRVojFfj+ICwH8QnMSAMEPf7AVdWFCPrRRZ0XRMZdEwiT2b9KY9\nSeW7X4G1vdwxICj46EwZgbWpVH8SlaQ9eXBV8c6GU7Z/eeSVY8LCK0vHGn5yUwpV\n20p8RWZzlWfCt9ovgQ7e4VKQuZHvt+LqMtXoKwn4LpviZ12tNysFpyxZQvDC7teJ\nrJT3aMt4oASBkdRGg0qDN0ScWTIV3YHYNuXPoZA5/+bSKhHADyHPs7yvVk9oKamH\nSxI1hwaX1aICxrdnJa3oRLuzw1P9FyH57wQXkIL6EQKBgQDdOOCTrdQ5acPwk8yZ\n/HvkkMrqis4m1jve3JDODTAHO64bLGXPMOTnZ9WZtgazy8I8BaQd2EKeXHyKHlWN\nZTgALGAe+WqxCRvIAGfDORjAPesCGLIIc6OZzPJsQAhqQnVzPfUP296e/E/3Kz2Z\nfZVCfmUeWamQngBzB6O66xNF8wKBgQC3oFmGQjYvsQx1h2G6oRU+ySzlCOiS2F7r\n9g08ceM/hRJt2R9C9wPvdvTRDJvRcMNe6jvk7gPxwPIwR34h9j7xro4rAXW0kfJl\nAxwCTtf+/U4UiQjThW5lvTE92zlzDgoIHIBQ0bQ+Y9s4nLem60TqNDlEpxGs8b3m\nDsrVxugy/QKBgBcDrclvUh7O9AV5OtXiQHlc3t9bpWrA6uWaiK4HDTITcV9+VPEj\nIw037i7ZkwTtc72O0K4SK4wSDxrHYRsepp7N/wn55LGaQvuhnyneLMcDKgnDy/G5\nJhIAElBUsQts8o8UqQQHWbeshB0wsG3hdL/AKoDnzw4ugdl1uADgJ9clAoGBAJxd\n795kg8AZBIMQxignA/BzX8epzmM93ZcR8DOIx/tPVmI0gmqD7tX8dn2OPyIa5EPv\nMxG/nZxAsfxq5P4Gs5MbEfWNSK57me5qt28/tK9vBQ53owx8k4YPld8Wz9UqH2DI\n5HvuF48JeaS7z6hUsFrAHgRYQLUFJrDB5/gjaZgBAoGBAMYk2P0U0DOtlXoqF71r\ngJcW9UfmlIdtrEr6oU/4iyYO3EpfnWX4qs5kNJ9H26AS2m7FBcikxn/GhZ2o8Ady\novNgwUGB4xKKHCNRdDnQS1+y2pOnLkoUBXL6rkN1pTedctV3DDIy69OMkXssill4\nNL6xE+HyaBFF7cyHgfO/8KpZ\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-2q1zz@subdivision-45cdf.iam.gserviceaccount.com",
  "client_id": "107604455225410419254",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2q1zz%40subdivision-45cdf.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Handle GET request to retrieve messages
app.get('/messages', async (req, res) => {
  try {
    const messagesRef = db.collection('messages');
    const snapshot = await messagesRef.get();
    const messages = snapshot.docs.map(doc => doc.data());
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages from Firestore:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle POST request to store messages
app.post('/messages', async (req, res) => {
  try {
    const { username, message, timestamp } = req.body;
    const messagesRef = db.collection('messages');
    await messagesRef.add({ username, message, timestamp });
    res.json({ status: 'Message sent successfully' });
  } catch (error) {
    console.error('Error storing message in Firestore:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
