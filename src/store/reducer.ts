import { createReducer} from '@reduxjs/toolkit';
import {setGenre} from './action';
import {setMore} from './action';
import {filmComps} from '../mocks/films';

type FilmComp = {
    id:string;
    name: string;
    date: string;
    genre: string;
    cardImgPath:string;
    posterImgPath:string;
    bgImgPath:string;
    videoPath:string;
    playerPoster:string;
    description:string;
    score:string;
    ratingCount:string;
    director:string;
    starring:string;
    runtime:string;
  }

type ReducerState = {
    genre: string ;
    filmComps: FilmComp[];
    mainFilm:FilmComp | undefined;
    more :number;
  };


const initialState:ReducerState = {
  genre: 'All genres',
  filmComps: filmComps,
  mainFilm: filmComps.find((element) => element.id === '0'),
  more: 8,
};

function filterFilmComps(genre: string, films: FilmComp[]): FilmComp[] {
  return genre !== 'All genres'
    ? films.filter((element) => element.genre === genre)
    : films.filter((element) => element.id !== '0');
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      const { payload } = action;
      state.genre = payload;
      state.more = 8 > filterFilmComps(payload, filmComps).length ? -1 : 8;
      state.filmComps = state.more > 0 ? filterFilmComps(payload, filmComps).slice(0,state.more) : filterFilmComps(payload, filmComps);

    })
    .addCase(setMore, (state, action) => {
      const { payload } = action;

      state.more = state.more + payload - 1 > filterFilmComps(state.genre, filmComps).length ? -1 : state.more + payload;

      state.filmComps = payload > 0 ? filterFilmComps(state.genre, filmComps).slice(0,state.more) : filterFilmComps(state.genre, filmComps);
    });
});

export default reducer;
