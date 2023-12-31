import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCard, FilmComp, PromoFilm, Review } from '../../types/film';
import { fetchFilmCards, fetchPromoFilm, fetchCurrentFilm, fetchCurrentFilmReviews, fetchCurrentFilmRecomends, fetchFavoriteFilms, addComment } from '../api-actions';
import { DataProcess } from '../../types/state';


const initialState: DataProcess = {
  genre:'All genres',
  more: 8,
  filtredFilmComps: [],
  filmCards: [],
  promoFilm: {} as PromoFilm,
  currentFilm:{} as FilmComp,
  currentFilmReviews: [],
  currentFilmRecomends: [],
  favoriteFilms: [],

  filmCardsLoadingStatus: false,
  promoFilmLoadingStatus: false,
  currentFilmLoadingStatus: false,
  currentFilmReviewsLoadingStatus: false,
  currentFilmRecomendsLoadingStatus: false,
  favoriteFilmsLoadingStatus: false,
  sendCommentStatus: true,
};

export function filterFilmComps(genre: string, films: FilmCard[]): FilmCard[] {
  return genre !== 'All genres'
    ? films.filter((element) => element.genre === genre)
    : films;
}

export const filmData = createSlice({
  name: 'data',
  initialState,
  reducers: {setGenre: (state, action: PayloadAction<string>) => {
    const { payload } = action;
    if (payload !== state.genre) {
      state.more = 8 >= filterFilmComps(payload, state.filmCards).length ? -1 : 8;
    }
    state.genre = payload;
    state.filtredFilmComps = state.more > 0 ? filterFilmComps(payload, state.filmCards).slice(0,state.more) : filterFilmComps(payload, state.filmCards);
  },
  setMore: (state, action: PayloadAction<number>) => {
    const { payload } = action;
    state.more = state.more + payload >= filterFilmComps(state.genre, state.filmCards).length ? -1 : state.more + payload;
    state.filtredFilmComps = state.more > 0 ? filterFilmComps(state.genre, state.filmCards).slice(0,state.more) : filterFilmComps(state.genre, state.filmCards);

  },},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmCards.pending, (state) => {
        state.filmCardsLoadingStatus = true;
      })
      .addCase(fetchFilmCards.fulfilled, (state, action: PayloadAction<FilmCard[]>) => {
        if (action.payload !== undefined){
          state.filmCards = action.payload;
          state.filmCardsLoadingStatus = false;
        }
      })


      .addCase(fetchPromoFilm.pending, (state) => {
        state.promoFilmLoadingStatus = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action: PayloadAction<PromoFilm>) => {
        if (action.payload !== undefined){
          state.promoFilm = action.payload;
          state.promoFilmLoadingStatus = false;
        }
      })


      .addCase(fetchCurrentFilm.pending, (state) => {
        state.currentFilmLoadingStatus = true;
      })
      .addCase(fetchCurrentFilm.fulfilled, (state, action: PayloadAction<FilmComp>) => {
        if (action.payload !== undefined){
          state.currentFilm = action.payload;
          state.currentFilmLoadingStatus = false;
        }
      })


      .addCase(fetchCurrentFilmReviews.pending, (state) => {
        state.currentFilmReviewsLoadingStatus = true;
      })
      .addCase(fetchCurrentFilmReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        if (action.payload !== undefined){
          state.currentFilmReviews = action.payload;
          state.currentFilmReviewsLoadingStatus = false;
        }
      })


      .addCase(fetchCurrentFilmRecomends.pending, (state) => {
        state.currentFilmRecomendsLoadingStatus = true;
      })
      .addCase(fetchCurrentFilmRecomends.fulfilled, (state, action: PayloadAction<FilmCard[]>) => {
        if (action.payload !== undefined){
          state.currentFilmRecomends = action.payload;
          state.currentFilmRecomendsLoadingStatus = false;
        }
      })


      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.favoriteFilmsLoadingStatus = true;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action: PayloadAction<FilmCard[]>) => {
        if (action.payload !== undefined){
          state.favoriteFilms = action.payload;
          state.favoriteFilmsLoadingStatus = false;
        }
      })


      .addCase(addComment.pending, (state) => {
        state.sendCommentStatus = false;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.sendCommentStatus = true;
      })
      .addCase(addComment.rejected, (state) => {
        state.sendCommentStatus = true;
      });

  },
});
export const { setGenre, setMore } = filmData.actions;
