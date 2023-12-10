import {  Namespace } from '../../const';
import { DataProcess } from '../../types/state';
import { getMore, getFilmCards, getFilmCardsDataLoadingStatus, getPromoFilm, getPromoFilmDataLoadingStatus, getCurrentFilm, getCurrentFilmDataLoadingStatus, getCurrentFilmReviews, getCurrentFilmReviewsDataLoadingStatus, getCurrentFilmRecomends, getCurrentFilmRecomendsDataLoadingStatus, getFavoriteFilms, getFavoriteFilmsDataLoadingStatus, getSendCommentStatus } from './selectors';
import { FilmComp, PromoFilm } from '../../types/film';
import { makeFakeCurrentFilm, makeFakeFilmCard, makeFakePromoFilm, makeFakeReview } from '../../utils/mocks';

describe('UserProcess selectors', () => {
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
  it('should return more from state', () => {
    const more = 74;
    const state: DataProcess = {
        ...defaultState,
        more: more,
    };
    const result = getMore({ [Namespace.Data]: state });
    expect(result).toBe(more);
  });

  it('should return filtredFilmComps from state', () => {
    const mockFilmCard = makeFakeFilmCard();
    const state: DataProcess = {
        ...defaultState,
        filtredFilmComps: [mockFilmCard],
    };
    const result = getFilmCards({ [Namespace.Data]: state });
    expect(result).toEqual([mockFilmCard]);
  });

  it('should return filmCardsLoadingStatus from state', () => {
    const filmCardsLoadingStatus = true;
    const state: DataProcess = {
        ...defaultState,
        filmCardsLoadingStatus: filmCardsLoadingStatus,
    };
    const result = getFilmCardsDataLoadingStatus({ [Namespace.Data]: state });
    expect(result).toBe(filmCardsLoadingStatus);
  });

  it('should return promoFilm from state', () => {
    const mockPromoFilm = makeFakePromoFilm();
    const state: DataProcess = {
        ...defaultState,
        promoFilm: mockPromoFilm,
    };
    const result = getPromoFilm({ [Namespace.Data]: state });
    expect(result).toEqual(mockPromoFilm);
  });
  
  it('should return promoFilmLoadingStatus from state', () => {
    const promoFilmLoadingStatus = true;
    const state: DataProcess = {
        ...defaultState,
        promoFilmLoadingStatus: promoFilmLoadingStatus,
    };
    const result = getPromoFilmDataLoadingStatus({ [Namespace.Data]: state });
    expect(result).toBe(promoFilmLoadingStatus);
  });

  it('should return currentFilm from state', () => {
    const mockCurrentFilm = makeFakeCurrentFilm();
    const state: DataProcess = {
        ...defaultState,
        currentFilm: mockCurrentFilm,
    };
    const result = getCurrentFilm({ [Namespace.Data]: state });
    expect(result).toEqual(mockCurrentFilm);
  });

  it('should return currentFilmLoadingStatus from state', () => {
    const currentFilmLoadingStatus = true;
    const state: DataProcess = {
        ...defaultState,
        currentFilmLoadingStatus: currentFilmLoadingStatus,
    };
    const result = getCurrentFilmDataLoadingStatus({ [Namespace.Data]: state });
    expect(result).toBe(currentFilmLoadingStatus);
    });
    it('should return currentFilmReviews from state', () => {
    const mockReview = makeFakeReview();
    const state: DataProcess = {
        ...defaultState,
        currentFilmReviews: [mockReview],
    };
    const result = getCurrentFilmReviews({ [Namespace.Data]: state });
    expect(result).toEqual([mockReview]);
    });

    it('should return currentFilmReviewsLoadingStatus from state', () => {
    const currentFilmReviewsLoadingStatus = true;
    const state: DataProcess = {
        ...defaultState,
        currentFilmReviewsLoadingStatus: currentFilmReviewsLoadingStatus,
    };
    const result = getCurrentFilmReviewsDataLoadingStatus({ [Namespace.Data]: state });
    expect(result).toBe(currentFilmReviewsLoadingStatus);
    });

    it('should return currentFilmRecomends from state', () => {
        const mockCurrentFilmRecomends = makeFakeFilmCard();
        const state: DataProcess = {
            ...defaultState,
            currentFilmRecomends: [mockCurrentFilmRecomends],
        };
        const result = getCurrentFilmRecomends({ [Namespace.Data]: state });
        expect(result).toEqual([mockCurrentFilmRecomends]);
      });

      it('should return currentFilmRecomendsLoadingStatus from state', () => {
        const currentFilmRecomendsLoadingStatus = true;
        const state: DataProcess = {
            ...defaultState,
            currentFilmRecomendsLoadingStatus: currentFilmRecomendsLoadingStatus,
        };
        const result = getCurrentFilmRecomendsDataLoadingStatus({ [Namespace.Data]: state });
        expect(result).toBe(currentFilmRecomendsLoadingStatus);
        });

        it('should return favoriteFilms from state', () => {
            const mockFavoriteFilms = makeFakeFilmCard();
            const state: DataProcess = {
                ...defaultState,
                favoriteFilms: [mockFavoriteFilms],
            };
            const result = getFavoriteFilms({ [Namespace.Data]: state });
            expect(result).toEqual([mockFavoriteFilms]);
          });

          it('should return favoriteFilmsLoadingStatus from state', () => {
            const favoriteFilmsLoadingStatus = true;
            const state: DataProcess = {
                ...defaultState,
                favoriteFilmsLoadingStatus: favoriteFilmsLoadingStatus,
            };
            const result = getFavoriteFilmsDataLoadingStatus({ [Namespace.Data]: state });
            expect(result).toBe(favoriteFilmsLoadingStatus);
            });

            it('should return sendCommentStatus from state', () => {
                const sendCommentStatus = true;
                const state: DataProcess = {
                    ...defaultState,
                    sendCommentStatus: sendCommentStatus,
                };
                const result = getSendCommentStatus({ [Namespace.Data]: state });
                expect(result).toBe(sendCommentStatus);
                });
  });