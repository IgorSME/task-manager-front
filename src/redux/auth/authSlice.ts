/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { ReduxUserState, IReduxAuthUser } from '../../types/appTypes';

import { logInAuth, currentUser, registerAuth } from './auth-operations';
import { persistReducer } from 'redux-persist';

const initialUserReduxState: ReduxUserState = {
  refreshToken: '',
  accessToken: '',
  id: null,
  name: '',
  email: '',
  roles: '',
  isLoggedIn: false,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserReduxState,
  reducers: {
    userAuth(state, { payload }: PayloadAction<IReduxAuthUser>) {
      state.refreshToken = payload.refreshToken;
      state.accessToken = payload.accessToken;
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.roles = payload.roles;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    logOutUser() {
      return initialUserReduxState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerAuth.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(registerAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        // state.refreshToken = payload!.refreshToken;
        // state.accessToken = payload!.accessToken;
        state.id = payload!.id;
        state.name = payload!.name;
        state.email = payload!.email;
        state.roles = payload!.roles;
      })
      .addCase(registerAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(currentUser.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.refreshToken = payload!.refreshToken;
        state.accessToken = payload!.accessToken;
        state.id = payload!.id;
        state.name = payload!.name;
        state.email = payload!.email;
        state.roles = payload!.roles;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(logInAuth.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logInAuth.fulfilled, (state, { payload }) => {
        state.refreshToken = payload!.refreshToken;
        state.accessToken = payload!.accessToken;
        state.id = payload!.id;
        state.name = payload!.name;
        state.email = payload!.email;
        state.roles = payload!.roles;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logInAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['refreshToken', 'accessToken', 'id', 'name', 'email', 'roles', 'isLoggedIn'],
};

const persistAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { userAuth, logOutUser } = authSlice.actions;

export default persistAuthReducer;
