
import { createContext, useState, useEffect, ReactNode} from 'react'

export interface AuthContextProps {
    token: string | null;
    login?: (token: string) => void;
    register?: (newToken: string) => void;
    logout?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({token: null});

export const AuthProvider = ({ children } : {children : ReactNode}) => { 
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token')); 

  useEffect(() => { 
      if (token) {
          localStorage.setItem('token', token); 
      } else {
          localStorage.removeItem('token'); 
      }
  }, [token]); 

  const login = (newToken: string) => {
    setToken(newToken); 
  }
  
  const register = (newToken: string) => {
    setToken(newToken);
  }


  const logout = () => {
    setToken(null); 
  };

  return (
      <AuthContext.Provider value={{ token, login, logout, register }}>
          {children}
      </AuthContext.Provider>
  );
}
