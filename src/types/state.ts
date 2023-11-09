import {FilmCard, PromoFilm, FilmComp, Review} from './film'
import {store} from '../store/index';
import { AuthorizationStatus } from '../const';
export type State = {
    id:string | undefined;
    genre: string ;
    filmComps: FilmCard[];
    isFilmCompsLoaded:boolean;
    filtredFilmComps: FilmCard[];
    promoFilm: PromoFilm;
    currentFilm:FilmComp;
    currentFilmReviews:Review[];
    currentFilmRecomends:FilmCard[];
    more :number;
    authorizationStatus: AuthorizationStatus,
    error :string | null;
  }

export type AppDispatch = typeof store.dispatch;