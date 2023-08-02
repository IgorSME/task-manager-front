import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { RootState, store } from '../store';
import { error500, error401Login, error429, error404 } from '../../data/ErrorData.json';

import { useAxiosConfig } from '../../helpers/axiosConfig';
import { IReduxAuthUser } from '../../types/appTypes';

import notificate from '../../utils/notification';

interface IUserInfoInput {
  email: string;
  password: string;
}

export interface SerializedAxiosError {
  message: string;
  name: string;
  code: string | undefined;
}

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (registerData: IUserInfoInput, thunkApi) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig(store);
      const response: AxiosResponse<IReduxAuthUser> = await axiosPublicInstance.post(
        'api/users/register',
        registerData
      );
      return response.data;
    } catch (error) {
      const newError = error as AxiosError<{ message: string }>;
      const serializedError: SerializedAxiosError = {
        message: newError.message,
        name: newError.name,
        code: newError.code,
      };
      const errorMessage = newError.response?.data?.message;
      if (errorMessage) {
        console.log('Registration Error:', errorMessage);
      }

      if (newError.response?.status === 404) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(serializedError);
      }

      if (newError.response?.status === 500) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(serializedError);
      }
    }
  }
);

export const logInAuth = createAsyncThunk(
  'auth/logIn',
  async (loginData: IUserInfoInput, thunkApi) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig(store);
      const response: AxiosResponse<IReduxAuthUser> = await axiosPublicInstance.post(
        'api/users/login',
        loginData
      );

      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      if (newError.response?.status === 401) {
        notificate('error', error401Login.title, error401Login.message);
        return thunkApi.rejectWithValue(newError.response);
      }
      if (newError.response?.status === 429) {
        notificate('error', error429.title, error429.message);
        return thunkApi.rejectWithValue(newError.response);
      }
      if (newError.response?.status === 500) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(newError.response);
      }
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig(store);
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);

      const response: AxiosResponse<IReduxAuthUser> = await axiosPrivateInstance.get(
        'api/users/current'
      );
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      if (newError.response?.status === 401) {
        return rejectWithValue(newError.response);
      }
      if (newError.response?.status === 404) {
        notificate('error', '', error404);
        return rejectWithValue(newError.response);
      }
      if (newError.response?.status === 500) {
        notificate('error', error500.title, error500.message);
        return rejectWithValue(newError.response);
      }
    }
  }
);
