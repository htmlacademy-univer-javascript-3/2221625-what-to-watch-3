import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCurrentFilm, makeFakeFilmCard, makeFakePromoFilm, makeFakeStore } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/mylist/mylist';
import MoviePage from '../../pages/movie-page/movie-page';
import Page404 from '../../pages/404-page/404-page';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const mockPromoFilm = makeFakePromoFilm();
    const mockFilmCard = makeFakeFilmCard();
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DATA: {
          ...makeFakeStore().DATA,
          promoFilm: mockPromoFilm,
          filtredFilmComps:[mockFilmCard]
        },
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(mockPromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilmCard.name)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<SignIn/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<MyList/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          ...makeFakeStore().USER,
          authorizationStatus: AuthorizationStatus.Auth,
        },
      })
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "MoviePage" when user navigate to "/films/:id"', () => {
    const withHistoryComponent = withHistory(<MoviePage/>, mockHistory);
    const mockCurrentFilm = makeFakeCurrentFilm();
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DATA: {
          ...makeFakeStore().DATA,
          currentFilm: mockCurrentFilm,
        },
      })
    );
    mockHistory.push(AppRoute.MoviePage);

    render(withStoreComponent);

    expect(screen.getByText(mockCurrentFilm.name)).toBeInTheDocument();
  });

  it('should render "Page404" when user navigate to "/*"', () => {
    const withHistoryComponent = withHistory(<Page404/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Page404);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/addreview"', () => {
    const withHistoryComponent = withHistory(<AddReview/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: {
          ...makeFakeStore().USER,
          authorizationStatus: AuthorizationStatus.Auth,
        },
      })
    );
    mockHistory.push(AppRoute.AddReview);

    render(withStoreComponent);

    expect(screen.getByText('Review text')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player"', () => {
    const withHistoryComponent = withHistory(<Player/>, mockHistory);
    const mockCurrentFilm = makeFakeCurrentFilm();
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DATA: {
          ...makeFakeStore().DATA,
          currentFilm: mockCurrentFilm,

        },
      }),
    );
    mockHistory.push(AppRoute.Player);

    render(withStoreComponent);

    expect(screen.getByText(mockCurrentFilm.name)).toBeInTheDocument();
  });

});
