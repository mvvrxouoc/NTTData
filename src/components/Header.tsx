
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Dropdown } from './Dropdown';

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isAuthenticaded = (user?.userData?.token || user?.google?.token) ?? false;
    const userData = user?.userData || user?.google;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
    <header className="header">
      <div className="logo">Mario App</div>
      <nav className="nav-center">
        {isAuthenticaded && (
          <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/user-data">Datos de Usuario</NavLink>
            <Dropdown />
          </>
        )}
      </nav>
      <div className="user-info">
        {isAuthenticaded && (
          <>
            <span className="username">{userData?.name}</span>
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </>
        )}
      </div>
    </header>
  );
};
