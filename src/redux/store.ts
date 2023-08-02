import { configureStore } from '@reduxjs/toolkit';

import persistAuthreducer from './auth/authSlice';
import persistedCategoryReducer from './categories/categoriesSlice';
import { baseApi } from '../helpers/baseApi';

import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import tasksReducer from './tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: persistAuthreducer,
    categories: persistedCategoryReducer,
    tasks: tasksReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([baseApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
