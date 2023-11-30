import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Namespace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl:'img/avatarWhat.jpg',
  hasError:false,
};

export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.avatarUrl = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasError = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasError = false;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.avatarUrl = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasError = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.avatarUrl = 'img/avatarWhat.jpg';
      });

  }
});
