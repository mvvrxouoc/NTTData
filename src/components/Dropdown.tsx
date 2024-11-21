import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

  return (
    <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">Ejemplos</button>
        {dropdown && (
        <div className="dropdown-content">
            <NavLink to="/dnd">Drag and Drop</NavLink>
            <NavLink to="/pokemon-api">Pokemon API</NavLink>
            <NavLink to="/google-calendar">Google Calendar</NavLink>
        </div>
        )}
    </div>
  )
}
