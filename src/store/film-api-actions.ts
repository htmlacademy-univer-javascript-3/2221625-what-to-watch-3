import { AxiosInstance,AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {State, AppDispatch} from '../types/state'
import { redirectToRoute} from './action';
import {loadFilms,  loadPromoFilm, loadCurrentFilm,loadCurrentFilmReviews,loadCurrentFilmRecomends,setFilmsLoadingStatus,loadFavoriteFilms} from './action';
import {APIRoute} from '../const'
import { getToken } from '../services/token';



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
  }>('films/fetchCurrentFilm/wtw', async (id, { dispatch, extra: api }) => {
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
  }>('films/fetchCurrentFilmReviews/wtw', async (id, { dispatch, extra: api }) => {
    
      const response = await api.get(`${APIRoute.Reviews}/${id}`);
      const data = response.data;
      dispatch(loadCurrentFilmReviews(data));
   
  });
  export const fetchCurrentFilmRecomends = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchCurrentFilmRecomends/wtw', async (id, { dispatch, extra: api }) => {
    
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


export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/fetchFavoriteFilms/wtw', 
    async (_arg, { dispatch, extra: api }) => {


      const response = await api.get(APIRoute.Favorite);
      const data = response.data; 
      dispatch(loadFavoriteFilms(data));
      
    }
);

export const addFavoriteFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/addFavoriteFilm/wtw', 
  async (id , { dispatch, extra: api }) => {
    const headers = {
      'X-Token': getToken(),
      'Content-Type': 'application/json'
    };
    const axiosConfig = {
      headers,
    };

    try {
      await api.post(`${APIRoute.Favorite}/${id}/1`, axiosConfig);
      dispatch(fetchFavoriteFilms());
      dispatch(redirectToRoute('/mylist'));
    } catch (error) {
      
      if (error instanceof AxiosError && error.response?.status===409) {
        dispatch(fetchFavoriteFilms());
          dispatch(redirectToRoute('/mylist'));
      }
      else{throw error;}
    }
  }
);


export const addComment = createAsyncThunk<void, { id: string, comment: string, rating: number }, {
  state: State;
  extra: AxiosInstance;
}>('films/addComment/wtw', 
  async ({ id, comment, rating }, { extra: api }) => {
    const headers = {
      'X-Token': getToken(),
      'Content-Type': 'application/json'
    };
    

    const axiosConfig = {
      headers,
    };

    const dataToSend = {
      'comment': comment,
      'rating': rating
    };
    
    await api.post(`${APIRoute.Reviews}/${id}`, dataToSend, axiosConfig);
  }
);



    
