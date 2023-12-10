import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeAuthData, makeFakeCurrentFilm, makeFakeFilmCard, makeFakePromoFilm, makeFakeReview } from '../utils/mocks';
import { State } from '../types/state';
import { addComment, changeFilmStatus, checkAuthAction, fetchCurrentFilm, fetchCurrentFilmRecomends, fetchCurrentFilmReviews, fetchFavoriteFilms, fetchFilmCards, fetchPromoFilm, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { filmCards: [] }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200,{avatarUrl:""});

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
        mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
        
        await store.dispatch(checkAuthAction());
        const actions = extractActionsTypes(store.getActions());
        
        expect(actions).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.rejected.type,
        ]);
      });
    });
    describe('fetchFilmCards', () => {
        it('should dispatch "fetchFilmCards.pending", "fetchFilmCards.fulfilled", when server response 200', async() => {
          const mockFilmCards = [makeFakeFilmCard()];
          mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockFilmCards);
    
          await store.dispatch(fetchFilmCards());
    
          const emittedActions = store.getActions();
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchFilmCardsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilmCards.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchFilmCards.pending.type,
            fetchFilmCards.fulfilled.type,
          ]);
    
          expect(fetchFilmCardsFulfilled.payload)
            .toEqual(mockFilmCards);
        });
    
        it('should dispatch "fetchFilmCards.pending", "fetchFilmCards.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);
    
          await store.dispatch(fetchFilmCards());
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchFilmCards.pending.type,
            fetchFilmCards.rejected.type,
          ]);
        });
      });

      describe('fetchPromoFilm', () => {
        it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.fulfilled", when server response 200', async() => {
          const mockPromoFilm = makeFakePromoFilm();
          mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(200, mockPromoFilm);
    
          await store.dispatch(fetchPromoFilm());
    
          const emittedActions = store.getActions();

          
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchPromoFilmFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoFilm.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchPromoFilm.pending.type,
            fetchPromoFilm.fulfilled.type,
          ]);
    
          expect(fetchPromoFilmFulfilled.payload)
            .toEqual(mockPromoFilm);
        });
    
        it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(APIRoute.PromoFilm).reply(400, []);
    
          await store.dispatch(fetchPromoFilm());
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchPromoFilm.pending.type,
            
            fetchPromoFilm.rejected.type,
          ]);
        });

      });

      describe('fetchCurrentFilm', () => {
        it('should dispatch "fetchCurrentFilm.pending", "fetchCurrentFilm.fulfilled", when server response 200', async() => {
          const mockCurrentFilm = makeFakeCurrentFilm();
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(200, mockCurrentFilm);
    
          await store.dispatch(fetchCurrentFilm("1"));
    
          const emittedActions = store.getActions();
          
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchCurrentFilmFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentFilm.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchCurrentFilm.pending.type,
            fetchCurrentFilm.fulfilled.type,
          ]);
    
          expect(fetchCurrentFilmFulfilled.payload)
            .toEqual(mockCurrentFilm);
        });
    
        it('should dispatch "fetchCurrentFilm.pending", "fetchCurrentFilm.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(400, []);
    
          await store.dispatch(fetchCurrentFilm("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilm.pending.type,
            
            fetchCurrentFilm.rejected.type,
          ]);
        });

        it('should dispatch "fetchCurrentFilm.pending", "fetchCurrentFilm.rejected" when server response 404', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1`).reply(404, []);
    
          await store.dispatch(fetchCurrentFilm("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilm.pending.type,
            redirectToRoute.type,
            fetchCurrentFilm.fulfilled.type,
          ]);
        });
      });

      describe('fetchCurrentFilmReviews', () => {
        it('should dispatch "fetchCurrentFilmReviews.pending", "fetchCurrentFilmReviews.fulfilled", when server response 200', async() => {
          const mockReviews = [makeFakeReview()];
          mockAxiosAdapter.onGet(`${APIRoute.Reviews}/1`).reply(200, mockReviews);
    
          await store.dispatch(fetchCurrentFilmReviews("1"));
    
          const emittedActions = store.getActions();
          
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchCurrentFilmReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentFilmReviews.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchCurrentFilmReviews.pending.type,
            fetchCurrentFilmReviews.fulfilled.type,
          ]);
    
          expect(fetchCurrentFilmReviewsFulfilled.payload)
            .toEqual(mockReviews);
        });
    
        it('should dispatch "fetchCurrentFilmReviews.pending", "fetchCurrentFilmReviews.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Reviews}/1`).reply(400, []);
    
          await store.dispatch(fetchCurrentFilmReviews("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilmReviews.pending.type,
            
            fetchCurrentFilmReviews.rejected.type,
          ]);
        });

        it('should dispatch "fetchCurrentFilmReviews.pending", "fetchCurrentFilmReviews.rejected" when server response 404', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Reviews}/1`).reply(404, []);
    
          await store.dispatch(fetchCurrentFilmReviews("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilmReviews.pending.type,
            redirectToRoute.type,
            fetchCurrentFilmReviews.fulfilled.type,
          ]);
        });
      });
      
      describe('fetchCurrentFilmRecomends', () => {
        it('should dispatch "fetchCurrentFilmRecomends.pending", "fetchCurrentFilmRecomends.fulfilled", when server response 200', async() => {
          const mockFilmCards = [makeFakeFilmCard()];
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1/similar`).reply(200, mockFilmCards);
    
          await store.dispatch(fetchCurrentFilmRecomends("1"));
    
          const emittedActions = store.getActions();
          
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchCurrentFilmRecomendsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentFilmRecomends.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchCurrentFilmRecomends.pending.type,
            fetchCurrentFilmRecomends.fulfilled.type,
          ]);
    
          expect(fetchCurrentFilmRecomendsFulfilled.payload)
            .toEqual(mockFilmCards);
        });
    
        it('should dispatch "fetchCurrentFilmRecomends.pending", "fetchCurrentFilmRecomends.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1/similar`).reply(400, []);
    
          await store.dispatch(fetchCurrentFilmRecomends("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilmRecomends.pending.type,
            
            fetchCurrentFilmRecomends.rejected.type,
          ]);
        });

        it('should dispatch "fetchCurrentFilmRecomends.pending", "fetchCurrentFilmRecomends.rejected" when server response 404', async () => {
          mockAxiosAdapter.onGet(`${APIRoute.Films}/1/similar`).reply(404, []);
    
          await store.dispatch(fetchCurrentFilmRecomends("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchCurrentFilmRecomends.pending.type,
            redirectToRoute.type,
            fetchCurrentFilmRecomends.fulfilled.type,
          ]);
        });
      });

      describe('fetchFavoriteFilms', () => {
        it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.fulfilled", when server response 200', async() => {
          const mockFilmCards = [makeFakeFilmCard()];
          mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFilmCards);
    
          await store.dispatch(fetchFavoriteFilms());
    
          const emittedActions = store.getActions();
          
          const extractedActionsTypes = extractActionsTypes(emittedActions);
          const fetchFavoriteFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteFilms.fulfilled>;
          expect(extractedActionsTypes).toEqual([
            fetchFavoriteFilms.pending.type,
            fetchFavoriteFilms.fulfilled.type,
          ]);
    
          expect(fetchFavoriteFilmsFulfilled.payload)
            .toEqual(mockFilmCards);
        });
    
        it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.rejected" when server response 400', async () => {
          mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);
    
          await store.dispatch(fetchFavoriteFilms());
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            fetchFavoriteFilms.pending.type,
            
            fetchFavoriteFilms.rejected.type,
          ]);
        });

      });

      describe('changeFilmStatus', () => {
        it('should dispatch "changeFilmStatus.pending", "changeFilmStatus.fulfilled", fetchFavoriteFilms.pending, when server response 200', async() => {
          mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(200);
          await store.dispatch(changeFilmStatus("1"));
          
          const emittedActions = store.getActions();
          const extractedActionsTypes = extractActionsTypes(emittedActions);
         
          expect(extractedActionsTypes).toEqual([
            changeFilmStatus.pending.type,
            fetchFavoriteFilms.pending.type,
            changeFilmStatus.fulfilled.type,
          ]);
    
        });
    
        it('should dispatch "changeFilmStatus.pending", "changeFilmStatus.rejected" when server response 400', async () => {
          mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(400);
    
          await store.dispatch(changeFilmStatus("1"));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            changeFilmStatus.pending.type,
            
            changeFilmStatus.rejected.type,
          ]);
        });

        it('should dispatch "changeFilmStatus.pending", "fetchFavoriteFilms.pending", "changeFilmStatus.fulfilled" when server response 409', async () => {
          mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(200);
          await store.dispatch(changeFilmStatus("1"));
          mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/0`).reply(409);
          await store.dispatch(changeFilmStatus("1"));
          const actions = extractActionsTypes(store.getActions()).slice(3);
          expect(actions).toEqual([
            changeFilmStatus.pending.type,
            fetchFavoriteFilms.pending.type,
            fetchFavoriteFilms.rejected.type,
            changeFilmStatus.fulfilled.type,
          ]);
        });


      });

      describe('addComment', () => {
        it('should dispatch "addComment.pending", "addComment.fulfilled",  when server response 200', async() => {
          mockAxiosAdapter.onPost(`${APIRoute.Reviews}/1`).reply(200);
          await store.dispatch(addComment({id:"1",comment:"text",rating:1}));
          
          const emittedActions = store.getActions();
          const extractedActionsTypes = extractActionsTypes(emittedActions);
         
          expect(extractedActionsTypes).toEqual([
            addComment.pending.type,
            redirectToRoute.type,
            addComment.fulfilled.type,
          ]);
    
        });
    
        it('should dispatch "addComment.pending", "addComment.rejected" when server response 400', async () => {
          mockAxiosAdapter.onPost(`${APIRoute.Reviews}/1`).reply(400);
          await store.dispatch(addComment({id:"1",comment:"text",rating:1}));

          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            addComment.pending.type,
            addComment.rejected.type,
          ]);
        });



      });


      describe('loginAction', () => {
        it('should dispatch "loginAction.pending", "fetchFavoriteFilms.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
          const fakeUser: AuthData = makeFakeAuthData();
          const fakeServerReplay = { token: 'secret' };
          mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
    
          await store.dispatch(loginAction(fakeUser));
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            loginAction.pending.type,
            fetchFavoriteFilms.pending.type,
            redirectToRoute.type,
            loginAction.fulfilled.type,
          ]);
        });
    
        it('should call "saveToken" once with the received token', async () => {
          const fakeUser: AuthData = makeFakeAuthData();
          const fakeServerReplay = { token: 'secret' };
          mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
          const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
    
          await store.dispatch(loginAction(fakeUser));
    
          expect(mockSaveToken).toBeCalledTimes(1);
          expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
        });
    
      });
      describe('logoutAction', () => {
        it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
          mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
    
          await store.dispatch(logoutAction());
          const actions = extractActionsTypes(store.getActions());
    
          expect(actions).toEqual([
            logoutAction.pending.type,
            logoutAction.fulfilled.type,
          ]);
        });
    
        it('should one call "dropToken" with "logoutAction"', async () => {
          mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
          const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
    
          await store.dispatch(logoutAction());
    
          expect(mockDropToken).toBeCalledTimes(1);
        });
      });

});