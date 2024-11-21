import { createContext, useState, ReactNode } from 'react';

interface userDataProps {
  name: string;
  token: string;
  isAuthenticated: boolean;
  email?: string;
  picture?: string;
}

interface userGoogleProps {
  auth: {
    token: string;
    refreshToken: string;
  },
  calendar: {
    id: string;
  },
  email?: string;
  picture?: string;
}

export interface UserProps {
  userData?: userDataProps,
  google?: userGoogleProps,
}

export interface AuthContextProps {
  user: UserProps | null;
  login: (user: { user: { token: string, name: string, email: string, picture?: string } }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);

  const login = (user: { user: { name: string, token: string, email: string, picture?: string } }) => {
    const userData = {
      userData: {
        name: user.user.name,
        token: user.user.token,
        isAuthenticated: true,
        calendar: {
          id: '',
        },
        email: user.user.email,
        picture: user.user.picture,
      },
      google: {
        auth: {
          token: user.user.token,
          refreshToken: '',
        },
        calendar: {
          id: '',
        },
        email: user.user.email,
        picture: user.user.picture,
      },
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
