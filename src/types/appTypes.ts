import { store } from '../redux/store';

export interface Icons {
  [key: string]: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export type FormInputsType = Record<string, string>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IReduxUser {
  id: number | null;
  roles: string;
  name: string;
  email: string;
}

export interface IReduxAuthUser {
  refreshToken: string;
  accessToken: string;
  id: number | null;
  roles: string;
  name: string;
  email: string;
}

export interface ReduxUserState {
  refreshToken: string;
  accessToken: string;
  id: number | null;
  roles: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean | string | null | unknown;
}
