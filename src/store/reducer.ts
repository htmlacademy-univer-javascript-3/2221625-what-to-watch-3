import { createReducer} from '@reduxjs/toolkit';
import {loadCurrentFilmRecomends, loadCurrentFilmReviews, setGenre} from './action';
import {setMore, setError, setID} from './action';
import { loadFilms,loadPromoFilm,loadCurrentFilm } from './action';
import {FilmCard, PromoFilm, FilmComp} from '../types/film'

import {State} from '../types/state'

const initialState:State = {
  id:"",
  genre: 'All genres',
  filmComps: [],
  filtredFilmComps:[],
  promoFilm: {} as PromoFilm,
  currentFilm:{} as FilmComp,
  currentFilmReviews: [],
  currentFilmRecomends: [],
  more: 8,
  error: null,
};

function filterFilmComps(genre: string, films: FilmCard[]): FilmCard[] {
  return genre !== 'All genres'
    ? films.filter((element) => element.genre === genre)
    : films;
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setID, (state, action) => {
      const { payload } = action;
      state.id=payload
    })
    .addCase(setGenre, (state, action) => {
      const { payload } = action;
      state.genre = payload;
      state.more = 8 > filterFilmComps(payload, state.filmComps).length ? -1 : 8;
      state.filtredFilmComps = state.more > 0 ? filterFilmComps(payload, state.filmComps).slice(0,state.more) : filterFilmComps(payload, state.filmComps);
    })
    .addCase(setMore, (state, action) => {
      const { payload } = action;
      state.more = state.more + payload - 1 > filterFilmComps(state.genre, state.filmComps).length ? -1 : state.more + payload;
      state.filtredFilmComps = payload > 0 ? filterFilmComps(state.genre, state.filmComps).slice(0,state.more) : filterFilmComps(state.genre, state.filmComps);
    })
    .addCase(loadFilms, (state, action) => {
      const { payload } = action;
      state.filmComps=payload
    })
    .addCase(loadPromoFilm, (state, action) => {
      const { payload } = action;
      state.promoFilm=payload
    })
    .addCase(loadCurrentFilm, (state, action) => {
      const { payload } = action;
      state.currentFilm=payload
    })
    .addCase(loadCurrentFilmReviews, (state, action) => {
      const { payload } = action;
      state.currentFilmReviews=payload
    })
    .addCase(loadCurrentFilmRecomends, (state, action) => {
      const { payload } = action;
      state.currentFilmRecomends=payload
    })
    .addCase(setError, (state, action) => {
      const { payload } = action;
      state.error=payload
    })
});

export default reducer;
