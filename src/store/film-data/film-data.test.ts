import { FilmComp, PromoFilm } from '../../types/film';

import { filmData } from './film-data';
import { filterFilmComps, setGenre,setMore} from './film-data';
import { addComment, fetchCurrentFilm, fetchCurrentFilmRecomends, fetchCurrentFilmReviews, fetchFavoriteFilms, fetchFilmCards,fetchPromoFilm } from '../api-actions';

import { fakeFilmCards, makeFakeCurrentFilm, makeFakeFilmCard, makeFakePromoFilm, makeFakeReview } from '../../utils/mocks';

const mockFilmCards = fakeFilmCards

describe('FilmData Slice', () => {
  const defaultState = {
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

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState={ ...defaultState };

    const result = filmData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...defaultState };
    const result = filmData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });  
  describe('FilmData reducers', () => {
    it('should set "genre" to "Action", "filtredFilmComps" to FilmCard[]  with "setGenre" action', () => {
      const initialState = { ...defaultState,  filmCards: mockFilmCards };
      const expectedState = {
        ...defaultState,
        genre: 'Action',
        filmCards: mockFilmCards,
        filtredFilmComps: [mockFilmCards[0],mockFilmCards[3],mockFilmCards[4],mockFilmCards[5],mockFilmCards[6],mockFilmCards[7],mockFilmCards[8],mockFilmCards[9]],
      };
      const result = filmData.reducer(initialState, setGenre("Action"));
      expect(result).toEqual(expectedState);
    });

    it('should set "genre" to "Drama","more" to -1, "filtredFilmComps" to FilmCard[]  with "setGenre" action', () => {
      const initialState = { ...defaultState,  filmCards: mockFilmCards };
      const expectedState = {
        ...defaultState,
        genre: 'Drama',
        more: -1,
        filmCards: mockFilmCards,
        filtredFilmComps: [mockFilmCards[1],mockFilmCards[12],mockFilmCards[13],mockFilmCards[14]],
      };
      const result = filmData.reducer(initialState, setGenre("Drama"));
      expect(result).toEqual(expectedState);
    });

    it('should set "genre" to "All genres","more" to 8, "filtredFilmComps" to FilmCard[]  with "setGenre" action', () => {
      const initialState = { ...defaultState,  filmCards: mockFilmCards };
      const expectedState = {
        ...defaultState,
        genre: 'All genres',
        more: 8,
        filmCards: mockFilmCards,
        filtredFilmComps: [mockFilmCards[0],mockFilmCards[1],mockFilmCards[2],mockFilmCards[3],mockFilmCards[4],mockFilmCards[5],mockFilmCards[6],mockFilmCards[7]],
      };
      const result = filmData.reducer(initialState, setGenre("All genres"));
      expect(result).toEqual(expectedState);
    });

    it('should set "more" to "16", "filtredFilmComps" to FilmCard[]  with "setMore" action', () => {
      const initialState = { ...defaultState,  filmCards: mockFilmCards };
      const expectedState = {
        ...defaultState,
        more:16,
        filmCards: mockFilmCards,
        filtredFilmComps: [mockFilmCards[0],mockFilmCards[1],mockFilmCards[2],mockFilmCards[3],mockFilmCards[4],mockFilmCards[5],mockFilmCards[6],mockFilmCards[7],mockFilmCards[8],mockFilmCards[9],mockFilmCards[10],mockFilmCards[11],mockFilmCards[12],mockFilmCards[13],mockFilmCards[14],mockFilmCards[15]],
      };
      const result = filmData.reducer(initialState, setMore(8));
      expect(result).toEqual(expectedState);
    });

    it('should set "more" to "-1", "filtredFilmComps" to FilmCard[]  with "setMore" action', () => {
      const initialState = { ...defaultState,  filmCards: mockFilmCards };
      const expectedState = {
        ...defaultState,
        more:-1,
        filmCards: mockFilmCards,
        filtredFilmComps: [mockFilmCards[0],mockFilmCards[1],mockFilmCards[2],mockFilmCards[3],mockFilmCards[4],mockFilmCards[5],mockFilmCards[6],mockFilmCards[7],mockFilmCards[8],mockFilmCards[9],mockFilmCards[10],mockFilmCards[11],mockFilmCards[12],mockFilmCards[13],mockFilmCards[14],mockFilmCards[15],mockFilmCards[16]],
      };
      const result = filmData.reducer(initialState, setMore(9));
      expect(result).toEqual(expectedState);
    });
  });
  describe('FilmData extraReducers', () => {

    it('should set "filmCardsLoadingStatus" to "true", with "fetchFilmCards.pending" action', () => {
      const expectedState = {
        ...defaultState,
        filmCardsLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchFilmCards.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "filmCardsLoadingStatus" to "false","films" to FilmCard[] with "fetchFilmCards.fulfilled" action', () => {
      const mockFilmCard = makeFakeFilmCard();
      const initialState = { ...defaultState,  filmCardsLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        filmCards: [mockFilmCard],
        filmCardsLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchFilmCards.fulfilled(
          [mockFilmCard],'', undefined )
      );
      expect(result).toEqual(expectedState);
    });


    it('should set "promoFilmLoadingStatus" to "true", with "fetchPromoFilm.pending" action', () => {
      const expectedState = {
        ...defaultState,
        promoFilmLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchPromoFilm.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "filmCardsLoadingStatus" to "false","promoFilm" to PromoFilm with "fetchPromoFilm.fulfilled" action', () => {
      const mockPromoFilm = makeFakePromoFilm();
      const initialState = { ...defaultState,  promoFilmLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        promoFilm: mockPromoFilm,
        promoFilmLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchPromoFilm.fulfilled(
          mockPromoFilm,'', undefined )
      );
      expect(result).toEqual(expectedState);
    });


    it('should set "currentFilmLoadingStatus" to "true", with "fetchCurrentFilm.pending" action', () => {
      const expectedState = {
        ...defaultState,
        currentFilmLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchCurrentFilm.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "currentFilmLoadingStatus" to "false","currentFilm" to FilmComp with "fetchCurrentFilm.fulfilled" action', () => {
      const mockCurrentFilm = makeFakeCurrentFilm();
      const initialState = { ...defaultState,  currentFilmLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        currentFilm: mockCurrentFilm,
        currentFilmLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchCurrentFilm.fulfilled(
          mockCurrentFilm,'', '' )
      );
      expect(result).toEqual(expectedState);
    });


    it('should set "currentFilmReviewsLoadingStatus" to "true", with "fetchCurrentFilmReviews.pending" action', () => {
      const expectedState = {
        ...defaultState,
        currentFilmReviewsLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchCurrentFilmReviews.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "currentFilmReviewsLoadingStatus" to "false","currentFilmReviews" to Review[] with "fetchCurrentFilmReviews.fulfilled" action', () => {
      const mockFakeReview = makeFakeReview();
      const initialState = { ...defaultState,  currentFilmReviewsLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        currentFilmReviews: [mockFakeReview],
        currentFilmReviewsLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchCurrentFilmReviews.fulfilled(
          [mockFakeReview],'', '' )
      );
      expect(result).toEqual(expectedState);
    });


    it('should set "currentFilmRecomendsLoadingStatus" to "true", with "fetchCurrentFilmRecomends.pending" action', () => {
      const expectedState = {
        ...defaultState,
        currentFilmRecomendsLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchCurrentFilmRecomends.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "currentFilmRecomendsLoadingStatus" to "false","currentFilmRecomends" to FilmCard[] with "fetchCurrentFilmRecomends.fulfilled" action', () => {
      const mockFilmCard = makeFakeFilmCard();
      const initialState = { ...defaultState,  currentFilmRecomendsLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        currentFilmRecomends: [mockFilmCard],
        currentFilmRecomendsLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchCurrentFilmRecomends.fulfilled(
          [mockFilmCard],'', '' )
      );
      expect(result).toEqual(expectedState);
    });

    it('should set "favoriteFilmsLoadingStatus" to "true", with "fetchFavoriteFilms.pending" action', () => {
      const expectedState = {
        ...defaultState,
        favoriteFilmsLoadingStatus:true,
      };
      const result = filmData.reducer(undefined, fetchFavoriteFilms.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "favoriteFilmsLoadingStatus" to "false","favoriteFilms" to FilmCard[] with "fetchFavoriteFilms.fulfilled" action', () => {
      const mockFilmCard = makeFakeFilmCard();
      const initialState = { ...defaultState,  favoriteFilmsLoadingStatus: true };
      const expectedState = {
        ...defaultState,
        favoriteFilms: [mockFilmCard],
        favoriteFilmsLoadingStatus: false,
      };
      const result = filmData.reducer(
        initialState,
        fetchFavoriteFilms.fulfilled(
          [mockFilmCard],'', undefined )
      );
      expect(result).toEqual(expectedState);
    });


    it('should set "sendCommentStatus" to "false", with "addComment.pending" action', () => {
      const expectedState = {
        ...defaultState,
        sendCommentStatus:false,
      };
      const result = filmData.reducer(undefined, addComment.pending);
      expect(result).toEqual(expectedState);
    });
    it('should set "sendCommentStatus" to "true", with "addComment.fulfilled" action', () => {
      const expectedState = {
        ...defaultState,
        sendCommentStatus:true,
      };
      const result = filmData.reducer(undefined, addComment.fulfilled);
      expect(result).toEqual(expectedState);
    });
    it('should set "sendCommentStatus" to "true", with "addComment.rejected" action', () => {
      const expectedState = {
        ...defaultState,
        sendCommentStatus:true,
      };
      const result = filmData.reducer(undefined, addComment.rejected);
      expect(result).toEqual(expectedState);
    });

  });
});

describe('filterFilmComps Function', () => {
  
  
  it('should filter films by genre when genre is not "All genres"', () => {
    const genre = 'Action';
    const expectedResult = [mockFilmCards[0],mockFilmCards[3],mockFilmCards[4],mockFilmCards[5],mockFilmCards[6],mockFilmCards[7],mockFilmCards[8],mockFilmCards[9],mockFilmCards[10],mockFilmCards[11],mockFilmCards[15],mockFilmCards[16]] ;
    const result = filterFilmComps(genre, mockFilmCards);
    expect(result).toEqual(expectedResult);
  });

  it('should return all films when genre is "All genres"', () => {
    const genre = 'All genres';
    const expectedResult = mockFilmCards;
    const result = filterFilmComps(genre, mockFilmCards);
    expect(result).toEqual(expectedResult);
  });
});