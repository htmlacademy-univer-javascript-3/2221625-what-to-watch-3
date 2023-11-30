import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';

import { filmData } from './film-data/film-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [Namespace.Data]: filmData.reducer,
  [Namespace.User]: userProcess.reducer,
});
