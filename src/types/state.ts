import { FilmCard, PromoFilm, FilmComp, Review } from './film';
import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  avatarUrl:string;
  hasError:boolean;
};
export type DataProcess = {
  genre:string;
  more: number;
  filtredFilmComps: FilmCard[];
  filmCards: FilmCard[];
  promoFilm: PromoFilm;
  currentFilm: FilmComp;
  currentFilmReviews: Review[];
  currentFilmRecomends: FilmCard[];
  favoriteFilms: FilmCard[];
  filmCardsLoadingStatus: boolean;
  promoFilmLoadingStatus: boolean;
  currentFilmLoadingStatus: boolean;
  currentFilmReviewsLoadingStatus: boolean;
  currentFilmRecomendsLoadingStatus: boolean;
  favoriteFilmsLoadingStatus: boolean;
  sendCommentStatus: boolean;
}
