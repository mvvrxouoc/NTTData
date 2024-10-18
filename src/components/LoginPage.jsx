import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


return (
  <>
  <div className="form">
    <h1>LOGUEATE</h1>
      <form>
        <input type="text" value={username} placeholder="Usuario" />
        <input type="password" value={password} placeholder="Contraseña" />
        <NavLink to="/private">Iniciar sesión</NavLink>
      </form>
      <div className="segopt">
        <h4>¿No tienes cuenta?</h4>
        <NavLink to="/register">Regístrate</NavLink>
      </div>
  </div></>
  
); 
}
