import { RootState } from '../../types/appTypes';

export const isAuthLoading = (state: RootState) => state.auth.isLoading;
export const isAuthError = (state: RootState) => state.auth.isError;

export const userData = (state: RootState) => state.auth.user;
