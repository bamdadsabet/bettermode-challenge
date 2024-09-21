/**
 * The AuthContext is used to store the user authentication state
 * and the user token. The AuthProvider is a context provider that
 * wraps the App component and stores the user authentication state
 */
import { createContext, useState } from 'react';
import { LoginTypeEnum } from '../types';

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string;
  userLoginType: LoginTypeEnum;
  setUserType: (type: LoginTypeEnum) => void;
  setToken: (token: string) => void;
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storageToken = localStorage.getItem('token');
  const userType = localStorage.getItem('userType') as LoginTypeEnum;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storageToken ? true : false);
  const [userLoginType, setUserLoginType] = useState<LoginTypeEnum>(userType);
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
    localStorage.removeItem('userType');
  }
  const setUserType = (type: LoginTypeEnum) => {
    setUserLoginType(type)
    localStorage.setItem('userType', type);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, setToken, logout, userLoginType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
