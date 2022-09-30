/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import Axios, { AxiosError } from 'axios';
import { environment } from '../environments/environment';

export const axios = Axios.create({
  baseURL: environment.apiUrl,
});

axios.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiResponse<never>>) => {
    if (error.response?.data.error) {
      const e = error.response.data.error as ApiError;
      return Promise.reject(e);
    }

    return Promise.reject(new ApiError(error, 1000, null));
  }
);
