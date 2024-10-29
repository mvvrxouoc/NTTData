import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const users = [];

// Endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.status(200).json({ token: 'fake-jwt-token', user: { username: user.username } });
    } else {
        res.status(401).json({ message: 'Datos incorrectos' });
    }
});

app.post('/api/register', (req, res) => {
    const { username, password, email, birthDate } = req.body;
    
    if (!username || !password || !email || !birthDate) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userRepetido = users.find(user => user.username === username);

    if (userRepetido) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
    }

    const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        birthDate,
    };

    users.push(newUser);

    res.status(201).json({ status: "ok", code: 201, message: 'Usuario registrado exitosamente', user: newUser });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));