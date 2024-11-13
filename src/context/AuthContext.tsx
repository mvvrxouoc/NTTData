
import { createContext, useState, ReactNode} from 'react'

interface userDataProps {
  name: string;
  token: string;
  email?: string;
  birthDay?: Date | string;
}

interface userGoogleProps {
  auth: {
    token: string;
    refreshToken: string;
  },
  calendar: {
    id: string;
  },
}

export interface UserProps {
  userData?: userDataProps,
  google?: userGoogleProps,
}

export interface AuthContextProps {
  user: UserProps | null;
  login: (user : {user: {token: string, name: string }}) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children } : {children : ReactNode}) => { 
  const [user, setUser] = useState<UserProps | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null); 

  const login = (user : { user: {name: string, token: string} } ) => {
    const userData = { userData : { name: user.user.name, token: user.user.token, isAuthenticated: true } };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
      <AuthContext.Provider value={{ user, login, logout  }}>
          {children}
      </AuthContext.Provider>
  );
}
