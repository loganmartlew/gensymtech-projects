import { IUser } from '@gensymtech-projects/api-interfaces';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { login as loginApi, logout as logoutApi } from './api/auth';

interface AuthContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);
export const useAuth = () => useContext(AuthContext);

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string) => {
    const user = await loginApi(email, password);
    setUser(user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const value: AuthContext = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
