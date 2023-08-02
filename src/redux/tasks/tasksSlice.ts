import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getTasks, createTask, removeTask, changeTask } from './task-operations';

export interface ITask {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskId: number;
}

interface TasksState {
  data: ITask[];
  isLoading: boolean;
  isError: boolean | string | null | undefined;
}

const initialState: TasksState = {
  data: [],
  isLoading: false,
  isError: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.data.push(payload);
    },
    deleteTask: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.filter(task => task.id !== payload);
    },
    updateTask: (state, { payload }: PayloadAction<{ taskId: number; taskData: ITask }>) => {
      const { taskId, taskData } = payload;
      const taskIndex = state.data.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.data[taskIndex] = taskData;
      }
    },
    getTasksByCategoryId: (state, { payload }: PayloadAction<ITask[]>) => {
      state.data = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getTasks.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = error.message;
      })
      .addCase(createTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.push(payload);
      })
      .addCase(createTask.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = error.message;
      })
      .addCase(removeTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(removeTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = state.data.filter(task => task.id !== payload);
      })
      .addCase(removeTask.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = error.message;
      })
      .addCase(changeTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(changeTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const taskToUpdate = state.data.find(task => task.id === payload.id);
        if (taskToUpdate) {
          Object.assign(taskToUpdate, payload);
        }
      })
      .addCase(changeTask.rejected, (state, { error }) => {
        state.isLoading = false;
        state.isError = error.message;
      });
  },
});

const tasksReducer = tasksSlice.reducer;

export const { addTask, deleteTask, updateTask, getTasksByCategoryId } = tasksSlice.actions;
export default tasksReducer;
