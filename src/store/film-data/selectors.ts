import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { FilmCard, FilmComp, PromoFilm, Review } from '../../types/film';


export const getMore = (state: Pick<State, NameSpace.Data>): number => state[NameSpace.Data].more;

export const getFilms = (state: Pick<State, NameSpace.Data>): FilmCard[] => state[NameSpace.Data].filtredFilmComps;
export const getFilmsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].filmsLoadingStatus;

export const getPromoFilm = (state: Pick<State, NameSpace.Data>): PromoFilm => state[NameSpace.Data].promoFilm;
export const getPromoFilmDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].promoFilmLoadingStatus;

export const getCurrentFilm = (state: Pick<State, NameSpace.Data>): FilmComp => state[NameSpace.Data].currentFilm;
export const getCurrentFilmDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].currentFilmLoadingStatus;

export const getCurrentFilmReviews = (state: Pick<State, NameSpace.Data>): Review[] => state[NameSpace.Data].currentFilmReviews;
export const getCurrentFilmReviewsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].currentFilmReviewsLoadingStatus;

export const getCurrentFilmRecomends = (state: Pick<State, NameSpace.Data>): FilmCard[] => state[NameSpace.Data].currentFilmRecomends;
export const getCurrentFilmRecomendsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].currentFilmRecomendsLoadingStatus;

export const getFavoriteFilms = (state: Pick<State, NameSpace.Data>): FilmCard[] => state[NameSpace.Data].favoriteFilms;
export const getFavoriteFilmsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].favoriteFilmsLoadingStatus;

export const getSendCommentStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].sendCommentStatus;
