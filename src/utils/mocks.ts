import { internet, datatype, lorem, image, random, name } from 'faker';
import { FilmCard, PromoFilm, FilmComp, Review } from '../types/film';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { Action } from 'redux';
import { AuthData } from '../types/auth-data';
import { AuthorizationStatus } from '../const';
export const makeFakeAvatarURL=(): string =>(image.imageUrl())

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
export const makeFakeAuthData = (): AuthData => ({
    "login": internet.email(),
    "password": internet.password(),
});

export const makeFakeFilmCard = ():FilmCard => ({
    id: datatype.uuid(),
    name: lorem.words(),
    previewImage: image.imageUrl(),
    previewVideoLink: internet.url(),
    genre: random.word(),
});

export const makeFakePromoFilm = ():PromoFilm => ({
  id: datatype.uuid(),
  name: lorem.words(),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  videoLink: internet.url(),
  genre: random.word(),
  released: datatype.number(),
  isFavorite: random.boolean(),
});

export const makeFakeCurrentFilm = (): FilmComp => ({
    id: datatype.uuid(),
    name: lorem.words(),
    posterImage: image.imageUrl(),
    backgroundImage: image.imageUrl(),
    backgroundColor: internet.color(),
    videoLink: internet.url(),
    description: lorem.paragraphs(),
    rating: random.number({ min: 0, max: 10, precision: 0.1 }),
    scoresCount: datatype.number(),
    director: name.findName(),
    starring: [name.findName(), name.findName(), name.findName()],
    runTime: datatype.number({ min: 60, max: 180 }),
    genre: random.word(),
    released: datatype.number(),
    isFavorite: random.boolean(),
  });

export const makeFakeReview= (): Review => ({
    id: datatype.uuid(),
    date: datatype.datetime().toString(),
    user: internet.userName(),
    comment: lorem.paragraph(),
    rating: random.number({ min: 0, max: 10, precision: 0.1 }),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: { 
    authorizationStatus: AuthorizationStatus.NoAuth,
    avatarUrl:"",
    hasError:false 
    },
  DATA: {
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
  },
  ...initialState ?? {},
});


export const fakeFilmCards: FilmCard[] = [
    { id: '1', name: 'Film 1', previewImage: 'image1.jpg', previewVideoLink: 'video1.mp4', genre: 'Action' },
    { id: '2', name: 'Film 2', previewImage: 'image2.jpg', previewVideoLink: 'video2.mp4', genre: 'Drama' },
    { id: '3', name: 'Film 3', previewImage: 'image3.jpg', previewVideoLink: 'video3.mp4', genre: 'Comedy' },
    { id: '4', name: 'Film 4', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '5', name: 'Film 5', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '6', name: 'Film 6', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '7', name: 'Film 7', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '8', name: 'Film 8', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '9', name: 'Film 9', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '10', name: 'Film 10', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '11', name: 'Film 11', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '12', name: 'Film 12', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '13', name: 'Film 13', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Drama' },
    { id: '14', name: 'Film 14', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Drama' },
    { id: '15', name: 'Film 15', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Drama' },
    { id: '16', name: 'Film 16', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
    { id: '17', name: 'Film 17', previewImage: 'image4.jpg', previewVideoLink: 'video4.mp4', genre: 'Action' },
  ];