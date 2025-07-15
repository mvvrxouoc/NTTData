import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleDropdown = () => {
        if (dropdown) {
            setIsVisible(false);
            setTimeout(() => setDropdown(false), 300);
        } else {
            setDropdown(true);
            setIsVisible(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.dropdown')) {
                setIsVisible(false);
                setTimeout(() => setDropdown(false), 300);
            }
        };

        if (dropdown) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdown]);

  return (
    <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          <img src="/src/assets/img/dropdown.png" alt="Ejemplos" className="header-icon" />
          <span>Ejemplos</span>
        </button>
        {dropdown && (
        <div className={`dropdown-content${isVisible ? ' show' : ''}`}>
            <NavLink to="/dnd"><span>Drag and Drop</span></NavLink>
            <NavLink to="/pokemon-api"><span>Pokemon API</span></NavLink>
            <NavLink to="/google-calendar"><span>Google Calendar</span></NavLink>
        </div>
        )}
    </div>
  )
}
