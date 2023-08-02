import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { ITask } from './tasksSlice';
import { RootState, store } from '../store';
import { useAxiosConfig } from '../../helpers/axiosConfig';
import { ITaskCreate } from '../../pages/Tasks/Tasks';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (categoryId: number, { getState, rejectWithValue }) => {
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
      const response: AxiosResponse<ITask[]> = await axiosPrivateInstance.get(
        `/api/tasks/categories/${categoryId}/tasks`
      );
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (
    { categoryId, taskData }: { categoryId: number; taskData: ITaskCreate },
    { getState, rejectWithValue }
  ) => {
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
      taskData.taskId = categoryId;
      console.log(categoryId, taskData);

      const response = await axiosPrivateInstance.post(`/api/tasks/${categoryId}`, taskData);
      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: number, { getState, rejectWithValue }) => {
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

      await axiosPrivateInstance.delete(`/api/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);

export const changeTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { taskId, taskData }: { taskId: number; taskData: ITask },
    { getState, rejectWithValue }
  ) => {
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

      const response = await axiosPrivateInstance.patch(`/api/tasks/${taskId}`, taskData);

      return response.data;
    } catch (error) {
      const newError = error as AxiosError;
      return rejectWithValue(newError.message);
    }
  }
);
