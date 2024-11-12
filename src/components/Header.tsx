
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isAuthenticaded = user?.userData?.token ?? false;

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
            <NavLink to="/examples">Ejemplos</NavLink>
          </>
        )}
      </nav>
      <div className="user-info">
        {isAuthenticaded && (
          <>
            <span className="username">{user?.userData?.name}</span>
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </>
        )}
      </div>
    </header>
  );
};
