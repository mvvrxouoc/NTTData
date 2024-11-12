import express from 'express';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const client = new OAuth2Client("499673786460-0i0u0ke85r2ll6hf818mln3v402996h2.apps.googleusercontent.com");

// Endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.status(200).json({ user: { name: user.username, token: 'fake-jwt-token' } });
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

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    console.log('Token recibido en el backend', token);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "499673786460-0i0u0ke85r2ll6hf818mln3v402996h2.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).json({ message: 'Token incorrecto' });
        }

        const { sub, email, name } = payload;

        let user = users.find(user => user.email === email);

        if (!user) {
            user = {
                id: sub,
                username: name,
                email: email,
                password: null,
            };
            users.push(user);
        }
        
        const fakeToken = 'fake-jwt-token';
        res.status(200).json({ token: fakeToken, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error al vrificar el token de Google:', error);
        res.status(400).json({ message: 'Token incorrecto' });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));