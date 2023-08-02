import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { RootState, store } from '../store';
import { useAxiosConfig } from '../../helpers/axiosConfig';

export interface Category {
  id?: number;
  userId: number;
  name: string;
}

export const getCategories = createAsyncThunk(
  'categories/getCategoriesByUserId',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig(store);
      const state = getState() as RootState;
      const userId = state.auth.id;

      if (!userId) {
        return rejectWithValue('Not authorized');
      }
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);
      const response: AxiosResponse<Category[]> = await axiosPrivateInstance.get(`/api/categories`);
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: Category, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig(store);
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);

      const response: AxiosResponse<Category> = await axiosPrivateInstance.post(
        '/api/categories',
        categoryData
      );
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const changeCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, name }: { id: number; name: string }, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig(store);
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);
      const response: AxiosResponse<Category> = await axiosPrivateInstance.patch(
        `/api/categories/${id}`,
        { name }
      );
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: number, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig(store);
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);
      await axiosPrivateInstance.delete(`/api/categories/${categoryId}`);
      return categoryId; // Return the deleted categoryId
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);
