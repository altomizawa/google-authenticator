// server.js
const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode-terminal');
const speakeasy = require('speakeasy');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

// In-memory storage for user MFA details
let users = {};

// Generate a secret and QR code for MFA setup
function generateMFADetails(userId) {
  const secret = speakeasy.generateSecret({ length: 20 });
  const otpauth_url = speakeasy.otpauthURL({
    secret: secret.base32,
    label: userId,
    issuer: 'MyApp'
  });

  QRCode.generate(otpauth_url, { small: true }, (err, url) => {
    if (err) throw err;
    console.log(`Scan this QR code with your MFA app:\n${url}`);
  });

  return secret.base32;
}

// Route to initiate MFA setup
app.post('/setup-mfa', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (users[userId]) {
    return res.status(400).json({ error: 'MFA already set up for this user' });
  }

  const secret = generateMFADetails(userId);
  users[userId] = { secret };
  console.log(secret)

  res.json({ message: 'MFA setup initiated', secret });
});

// Route to verify MFA token
app.post('/verify-mfa', (req, res) => {
  const { userId, token } = req.body;
  console.log(req.body)
  if (!userId || !token) {
    return res.status(400).json({ error: 'User ID and token are required' });
  }

  if (!users[userId]) {
    return res.status(400).json({ error: 'MFA not set up for this user' });
  }

  const verified = speakeasy.totp.verify({
    secret: users[userId].secret,
    encoding: 'base32',
    token: token
  });

  if (verified) {
    res.json({ message: 'MFA verification successful' });
  } else {
    res.status(401).json({ error: 'Invalid MFA token' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
