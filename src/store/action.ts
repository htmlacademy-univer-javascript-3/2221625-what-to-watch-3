import { createAction} from '@reduxjs/toolkit';
import {FilmCard, PromoFilm,FilmComp,Review} from '../types/film'

export const setID = createAction<string | undefined>('SET_ID');
export const setGenre = createAction<string>('SET_GENRE');
export const setMore = createAction<number>('SET_MORE');

export const loadFilms = createAction<FilmCard[]>('data/loadFilms' ) ;
export const loadPromoFilm = createAction<PromoFilm>('data/loadPromoFilm' ) ;
export const loadCurrentFilm = createAction<FilmComp>('data/loadCurrentFilm' ) ;
export const loadCurrentFilmReviews = createAction<Review[]>('data/loadCurrentFilmReviews' ) ;
export const loadCurrentFilmRecomends = createAction<FilmCard[]>('data/loadCurrentFilmRecomends' ) ;
export const setError = createAction<string | null>('game/setError')