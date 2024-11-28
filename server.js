import express from 'express';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173";

const client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET);

// Endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.status(200).json({ user: { name: user.username, email: user.email, token: 'fake-jwt-token' } });
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
    const { code } = req.body;
    const redirectUri = "http://localhost:5173";
  
    try {
      
      const { tokens } = await client.getToken({ code, redirect_uri: redirectUri });
      client.setCredentials(tokens);
  
      const oauth2 = google.oauth2('v2');
      const userInfo = await oauth2.userinfo.get({ auth: client });
  
      const { id, email, name, picture } = userInfo.data;
  
      let user = users.find(user => user.email === email);
  
      if (!user) {
        user = {
          id: id,
          username: name,
          email: email,
          picture: picture,
          password: null,
        };
        users.push(user);
      }
  
      res.status(200).json({ token: tokens.access_token, user: { name: user.username, email: user.email, picture: user.picture } });
    } catch (error) {
      console.error('Error al intercambiar el código de autorización:', error);
      res.status(400).json({ message: error.message || 'Error al ingresar con Google' });
    }
  });

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));