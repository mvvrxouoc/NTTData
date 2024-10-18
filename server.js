const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.status(200).json({ token: 'fake-jwt-token', user: { username } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/register', (req, res) => {
    const { username, email } = req.body;
    res.status(201).json({ user: { username, email }, message: 'User registered' });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));