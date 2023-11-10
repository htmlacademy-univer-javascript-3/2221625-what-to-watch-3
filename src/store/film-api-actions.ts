import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {State, AppDispatch} from '../types/state'
import { redirectToRoute} from './action';
import {loadFilms,  loadPromoFilm, loadCurrentFilm,loadCurrentFilmReviews,loadCurrentFilmRecomends,setFilmsLoadingStatus} from './action';
import {APIRoute} from '../const'


export const fetchFilms = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (_arg, { dispatch, extra: api }) => {
    
      dispatch(setFilmsLoadingStatus(true));
      const response = await api.get(APIRoute.Films);
      const data = response.data;
      dispatch(setFilmsLoadingStatus(false));
      dispatch(loadFilms(data));
     
   
    
  });
  export const fetchCurrentFilm = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
  try{
      const response = await api.get(`${APIRoute.Films}/${id}`);
      const data = response.data;
      dispatch(loadCurrentFilm(data));
  }
  catch (error) {
    console.log("Navigate")
    dispatch(redirectToRoute('*'));

  }});


  export const fetchCurrentFilmReviews = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
    
      const response = await api.get(`${APIRoute.Reviews}/${id}`);
      const data = response.data;
      dispatch(loadCurrentFilmReviews(data));
   
  });
  export const fetchCurrentFilmRecomends = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchFilms/wtw', async (id, { dispatch, extra: api }) => {
    
      const response = await api.get(`${APIRoute.Films}/${id}/similar`);
      const data = response.data;
      dispatch(loadCurrentFilmRecomends(data));
   
  });
export const fetchPromoFilm = createAsyncThunk<void, undefined, {
dispatch: AppDispatch;
state: State;
extra: AxiosInstance;
}>('films/fetchPromoFilm/wtw', async (_arg, { dispatch, extra: api }) => {

    const response = await api.get(APIRoute.PromoFilm);
    const data = response.data;
    dispatch(loadPromoFilm(data));


});




    
