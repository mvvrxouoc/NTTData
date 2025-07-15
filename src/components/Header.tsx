import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Dropdown } from './Dropdown';
import React, { useRef, useEffect, useState } from 'react';

export const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticaded = (user?.userData?.token || user?.google?.token) ?? false;
    const userData = user?.userData || user?.google;

    const inicioRef = useRef<HTMLAnchorElement | null>(null);
    const userDataRef = useRef<HTMLAnchorElement | null>(null);

    const [barStyle, setBarStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let activeRef = null;
        if (location.pathname === '/') {
            activeRef = inicioRef;
        } else if (location.pathname.startsWith('/user-data')) {
            activeRef = userDataRef;
        }
        // Puedes añadir más condiciones para más enlaces

        if (activeRef && activeRef.current) {
            const rect = activeRef.current.getBoundingClientRect();
            const parent = activeRef.current.parentNode as HTMLElement | null;
            if (parent && typeof parent.getBoundingClientRect === 'function') {
                const parentRect = parent.getBoundingClientRect();
                setBarStyle({
                    left: rect.left - parentRect.left,
                    width: rect.width,
                    opacity: 1
                });
            }
        } else {
            setBarStyle({ left: 0, width: 0, opacity: 0 });
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="logo">Mario App</div>
      <nav className="nav-center" style={{ position: 'relative' }}>
        {isAuthenticaded && (
          <>
            <NavLink to="/" end className="header-link" ref={inicioRef}>
              <img src="/src/assets/img/home.png" alt="Inicio" className="header-icon" />
              <span>Inicio</span>
            </NavLink>
            <NavLink to="/user-data" className="header-link" ref={userDataRef}>
              <img src="/src/assets/img/user.png" alt="Usuario" className="header-icon" />
              <span>Datos de Usuario</span>
            </NavLink>
            <Dropdown />
            {/* Barra animada */}
            <div
              className="header-animated-bar"
              style={{
                position: 'absolute',
                bottom: 0,
                left: barStyle.left,
                width: barStyle.width,
                height: 4,
                background: '#ffd700',
                borderRadius: 2,
                transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
                opacity: barStyle.opacity,
                zIndex: 2
              }}
            />
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
