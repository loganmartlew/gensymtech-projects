import { IUser } from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import { showNotification } from '@mantine/notifications';
import { IconExclamationMark } from '@tabler/icons';
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
    // const user = await loginApi(email, password);
    // setUser(user);

    try {
      const user = await loginApi(email, password);
      setUser(user);
    } catch (error) {
      console.log(error);

      const errorMessage =
        error instanceof ApiError && error.message
          ? `${error.errorCode}: ${error.message}`
          : 'Failed to log in';

      showNotification({
        title: 'Error logging in',
        message: errorMessage,
        color: 'red',
        icon: <IconExclamationMark size={16} />,
      });
    }
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
