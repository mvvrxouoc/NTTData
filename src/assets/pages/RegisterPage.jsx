import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="form">
      <h1>REGISTRATE</h1>
        <form>
            <input type="text" value={username} placeholder="Usuario" />
            <input type="email" value={email} placeholder="Email" />
            <input type="password" value={password} placeholder="Contraseña" />
            <button type="submit">Registrarse</button>
        </form>
        <div className="segopt">
          <h4>¿Ya tienes cuenta?</h4>
          <NavLink to="/login">Iniciar sesión</NavLink>
        </div>
    </div>
  ); 
}
