import { LoginAuth, LogoutAuth } from '@gensymtech-projects/api-interfaces';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const login = (email: string, password: string) => {
  return fetchFromApi<LoginAuth>(
    axios.post(`/auth/login`, { email, password })
  );
};

export const logout = () => {
  return fetchFromApi<LogoutAuth>(axios.post(`/auth/logout`));
};
