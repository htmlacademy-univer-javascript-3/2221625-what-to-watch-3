import { createAction} from '@reduxjs/toolkit';

export const setGenre = createAction<string>('SET_GENRE');
export const setMore = createAction<number>('SET_MORE');

