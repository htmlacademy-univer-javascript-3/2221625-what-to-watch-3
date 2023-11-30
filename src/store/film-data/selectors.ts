import { Namespace } from '../../const';
import { State } from '../../types/state';
import { FilmCard, FilmComp, PromoFilm, Review } from '../../types/film';


export const getMore = (state: Pick<State, Namespace.Data>): number => state[Namespace.Data].more;

export const getFilms = (state: Pick<State, Namespace.Data>): FilmCard[] => state[Namespace.Data].filtredFilmComps;
export const getFilmsDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].filmsLoadingStatus;

export const getPromoFilm = (state: Pick<State, Namespace.Data>): PromoFilm => state[Namespace.Data].promoFilm;
export const getPromoFilmDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].promoFilmLoadingStatus;

export const getCurrentFilm = (state: Pick<State, Namespace.Data>): FilmComp => state[Namespace.Data].currentFilm;
export const getCurrentFilmDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].currentFilmLoadingStatus;

export const getCurrentFilmReviews = (state: Pick<State, Namespace.Data>): Review[] => state[Namespace.Data].currentFilmReviews;
export const getCurrentFilmReviewsDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].currentFilmReviewsLoadingStatus;

export const getCurrentFilmRecomends = (state: Pick<State, Namespace.Data>): FilmCard[] => state[Namespace.Data].currentFilmRecomends;
export const getCurrentFilmRecomendsDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].currentFilmRecomendsLoadingStatus;

export const getFavoriteFilms = (state: Pick<State, Namespace.Data>): FilmCard[] => state[Namespace.Data].favoriteFilms;
export const getFavoriteFilmsDataLoadingStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].favoriteFilmsLoadingStatus;

export const getSendCommentStatus = (state: Pick<State, Namespace.Data>): boolean => state[Namespace.Data].sendCommentStatus;
