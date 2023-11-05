import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {State, AppDispatch} from '../types/state'
import {loadFilms, setError, loadPromoFilm, loadCurrentFilm,loadCurrentFilmReviews,loadCurrentFilmRecomends} from './action';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const'
import {store} from './index'

export const fetchFilms = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get(APIRoute.Films);
      const data = response.data;
      dispatch(loadFilms(data));
    } catch (error) {
      dispatch(setError('Failed to load films. Please try again later.'));
      setTimeout(() => {
        dispatch(setError(null));
      }, TIMEOUT_SHOW_ERROR);
    }
  });

  export const fetchCurrentFilm = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
    try {
      const response = await api.get(`${APIRoute.Films}/${id}`);
      const data = response.data;
      dispatch(loadCurrentFilm(data));
    } catch (error) {
      dispatch(setError('Failed to load film. Please try again later.'));
      setTimeout(() => {
        dispatch(setError(null));
      }, TIMEOUT_SHOW_ERROR);
    }
  });

  export const fetchCurrentFilmReviews = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
    try {
      const response = await api.get(`${APIRoute.Films}/${id}/similar`);
      const data = response.data;
      dispatch(loadCurrentFilmReviews(data));
    } catch (error) {
      dispatch(setError('Failed to load recomends. Please try again later.'));
      setTimeout(() => {
        dispatch(setError(null));
      }, TIMEOUT_SHOW_ERROR);
    }
  });

  export const fetchCurrentFilmRecomends = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
    try {
      const response = await api.get(`${APIRoute.Reviews}/${id}`);
      const data = response.data;
      dispatch(loadCurrentFilmRecomends(data));
    } catch (error) {
      dispatch(setError('Failed to load reviews. Please try again later.'));
      setTimeout(() => {
        dispatch(setError(null));
      }, TIMEOUT_SHOW_ERROR);
    }
  });

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>('films/fetchPromoFilm/wtw', async (_arg, { dispatch, extra: api }) => {
try {
    const response = await api.get(APIRoute.PromoFilm);
    const data = response.data;
    dispatch(loadPromoFilm(data));
} catch (error) {
    dispatch(setError('Failed to load promo film. Please try again later.'));
    setTimeout(() => {
    dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
}
});



export const clearErrorAction = createAsyncThunk (
    'game/clearError',
    ()=>{
        setTimeout(

            ()=>store.dispatch(setError(null)),
            TIMEOUT_SHOW_ERROR,
        );
    },
    
);
    
