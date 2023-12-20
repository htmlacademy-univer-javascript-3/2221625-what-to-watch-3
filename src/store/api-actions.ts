import 'react-toastify/dist/ReactToastify.css';
import { AxiosInstance,AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { FilmCard, PromoFilm, FilmComp, Review } from '../types/film';
import { redirectToRoute} from './action';
import { APIRoute } from '../const';
import { getToken } from '../services/token';
import { saveToken, dropToken } from '../services/token';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { toast } from 'react-toastify';


export const fetchFilmCards = createAsyncThunk<FilmCard[], void, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/fetchFilms/wtw', async (_arg, { extra: api }) => {

  const response = await api.get(APIRoute.Films);
  const data: FilmCard[] = response.data as FilmCard[];
  return data;
});

export const fetchPromoFilm = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>('films/fetchPromoFilm/wtw', async (_arg, { extra: api }) => {

    const response = await api.get(APIRoute.PromoFilm);
    const data: PromoFilm = response.data as PromoFilm;
    return data;
  });


export const fetchCurrentFilm = createAsyncThunk<FilmComp, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchCurrentFilm/wtw', async (id, { dispatch, extra: api }) => {
    try {

      const response = await api.get(`${APIRoute.Films}/${id}`);
      const data: FilmComp = response.data as FilmComp;

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        dispatch(redirectToRoute('*'));
        return {} as FilmComp;
      } else {
        throw error;
      }
    }
  });


export const fetchCurrentFilmReviews = createAsyncThunk<Review[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchCurrentFilmReviews/wtw', async (id, { dispatch, extra: api }) => {
    try{

      const response = await api.get(`${APIRoute.Reviews}/${id}`);
      const data: Review[] = response.data as Review[];

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        dispatch(redirectToRoute('*'));
        return [];
      } else {
        throw error;
      }
    }
  });

export const fetchCurrentFilmRecomends = createAsyncThunk<FilmCard[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>('films/fetchCurrentFilmRecomends/wtw', async (id, { dispatch, extra: api }) => {
    try{

      const response = await api.get(`${APIRoute.Films}/${id}/similar`);
      const data: FilmCard[] = response.data as FilmCard[];

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        dispatch(redirectToRoute('*'));
        return [];
      } else {
        throw error;
      }
    }
  });


export const fetchFavoriteFilms = createAsyncThunk<FilmCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/fetchFavoriteFilms/wtw',
  async (_arg, { extra: api }) => {
    const response = await api.get(APIRoute.Favorite);
    const data: FilmCard[] = response.data as FilmCard[];
    return data;

  }
);

export const changeFilmStatus = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/changeFilmStatus/wtw',
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
    } catch (error) {

      if (error instanceof AxiosError && error.response?.status === 409) {
        await api.post(`${APIRoute.Favorite}/${id}/0`, axiosConfig);
        dispatch(fetchFavoriteFilms());
      } else{
        throw error;
      }
    }
  }
);


export const addComment = createAsyncThunk<void, { id: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('films/addComment/wtw',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {


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
    toast.info('the message has been sent');
    dispatch(redirectToRoute(`films/${id}`));


  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthAction',
  async (_arg, { extra: api }) => {

    const response = await api.get<UserData>(APIRoute.Login);
    return response.data.avatarUrl;

  });

export const loginAction =
createAsyncThunk<string, AuthData,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password},{dispatch,extra:api}) => {
      const response = await api.post<UserData>(APIRoute.Login, { email, password });
      const { token, avatarUrl } = response.data;
      saveToken(token);

      dispatch(fetchFavoriteFilms());
      dispatch(redirectToRoute('/'));
      return avatarUrl;
    },
  );

export const logoutAction =
createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, { extra: api }) => {
      await api.delete(APIRoute.Logout);
      dropToken();
    },
  );

