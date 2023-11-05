import {FilmCard, PromoFilm, FilmComp, Review} from './film'
import {store} from '../store/index';
export type State = {
    id:string | undefined;
    genre: string ;
    filmComps: FilmCard[];
    filtredFilmComps: FilmCard[];
    promoFilm: PromoFilm;
    currentFilm:FilmComp;
    currentFilmReviews:Review[];
    currentFilmRecomends:FilmCard[];
    more :number;
    error :string | null;
  }

export type AppDispatch = typeof store.dispatch;