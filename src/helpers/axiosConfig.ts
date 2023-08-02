/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { RootState } from '../redux/store';
import { IReduxAuthUser } from '../types/appTypes';
import { Store } from 'redux';

interface MyAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  _retry?: boolean;
}
interface MyData {
  accessToken: string;
}

let store: { getState: () => RootState };

export const injectStore = (_store: { getState: () => RootState }) => {
  store = _store;
};

export const useAxiosConfig = (store: Store) => {
  const state = store.getState();
  const stateRefreshToken = state.auth.refreshToken;

  const axiosPublicInstance = axios.create({
    baseURL: String(import.meta.env.VITE_BASE_URL),
    withCredentials: true,
  });

  const axiosPrivateInstance = axios.create({
    baseURL: String(import.meta.env.VITE_BASE_URL),
    withCredentials: true,
    headers: {
      'token-type': 'access_token',
    },
  });

  const axiosRefreshIstanse = axios.create({
    baseURL: String(import.meta.env.VITE_BASE_URL),
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${stateRefreshToken}`,
      'token-type': 'refresh_token',
    },
  });

  const authPrivateHeader = {
    set: (token: string) => {
      axiosPrivateInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    unset: () => {
      axiosPrivateInstance.defaults.headers.common['Authorization'] = '';
    },
  };

  axiosPrivateInstance.interceptors.response.use(
    (res: AxiosResponse<IReduxAuthUser>) => res,
    async (err: AxiosError) => {
      const originalConfig = err.config as MyAxiosRequestConfig;
      if (err.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axiosRefreshIstanse.get<MyData>('api/users/refresh-token');
          const accessToken = data?.accessToken;
          if (originalConfig && originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            return axiosPrivateInstance(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    }
  );

  return { authPrivateHeader, axiosPublicInstance, axiosPrivateInstance };
};
