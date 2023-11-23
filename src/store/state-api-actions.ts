import { createAsyncThunk } from '@reduxjs/toolkit';
import { requireAuthorization, redirectToRoute} from './action';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../services/token';
import {State, AppDispatch} from '../types/state'
import {APIRoute, AuthorizationStatus} from '../const'
import {UserData} from '../types/user-data'
import {AuthData} from '../types/auth-data'




export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'films/fetchFilms/wtw',
    async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  });

  export const loginAction =
createAsyncThunk<void, AuthData,
{
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    }>(
    'user/login',
    async ({login: email, password},{dispatch,extra:api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email,    password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute('/'));
},
);

export const logoutAction =
createAsyncThunk<void, undefined,
{
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    }>(
    'user/login',
    async (_arg, { dispatch, extra: api }) => {
        await api.delete(APIRoute.Logout);
        dropToken();
        dispatch (requireAuthorization(AuthorizationStatus.NoAuth));
},
);