import React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext() // Cramos un contexto para el manejo de la autenticación

export const AuthProvider = ({ children }) => { // Creamos un componente que se encargará de manejar el estado de la autenticación
  const [token, setToken] = useState(() => localStorage.getItem('token')); // Inicializamos el estado del token con el valor que se encuentre en el localStorage

  useEffect(() => { // Utilizamos un efecto para guardar el token en el localStorage
      if (token) {
          localStorage.setItem('token', token); // Si el token existe, lo guardamos en el localStorage
      } else {
          localStorage.removeItem('token'); // Si no existe, lo eliminamos del localStorage
      }
  }, [token]); // El efecto se ejecutará cada vez que el token cambie

  const login = (newToken) => setToken(newToken); // Creamos una función para actualizar el token
  const logout = () => setToken(null); // Creamos una función para eliminar el token

  return (
      <AuthContext.Provider value={{ token, login, logout }}>
          {children}
      </AuthContext.Provider>
  );
}
