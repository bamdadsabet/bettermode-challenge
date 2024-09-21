/**
 * The AuthContext is used to store the user authentication state
 * and the user token. The AuthProvider is a context provider that
 * wraps the App component and stores the user authentication state
 */
import { createContext, useState } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string;
  setToken: (token: string) => void;
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storageToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storageToken ? true : false);
  const [accessToken, setAccessToken] = useState<string>(storageToken ?? '');

  const setToken = (token: string) => {
    setAccessToken(token)
    setIsAuthenticated(true)
    localStorage.setItem('token', token);
  }

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken('');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
