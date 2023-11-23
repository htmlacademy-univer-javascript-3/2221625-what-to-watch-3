import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import MyList from '../../pages/my-list/my-list';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import {useAppSelector} from '../../hooks';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';
import { AuthorizationStatus } from '../../const';
import {fetchFavoriteFilms } from '../../store/api-actions';
import { store } from '../../store/index';

import {
  Routes,
  Route,
} from 'react-router-dom';

import PrivateRoute from '../private-route/private-route';
import { getFilmsDataLoadingStatus } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element{
  const isFilmsLoading = useAppSelector(getFilmsDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isFilmsLoading || authorizationStatus === AuthorizationStatus.Unknown) {

    return(<LoadingPage/>);
  }
  if(authorizationStatus === AuthorizationStatus.Auth) {
    store.dispatch(fetchFavoriteFilms());
  }


  return(
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path='/'
          element={< Main />}
        />
        <Route
          path='/login'
          element={< SignIn/>}
        />
        <Route
          path='/mylist'
          element={<PrivateRoute authorizationStatus={authorizationStatus}>< MyList/></PrivateRoute>}
        />

        <Route
          path='/films/:id'
          element={< MoviePage />}
        />
        <Route
          path="*"
          element={<Page404/>}
        />

        <Route
          path='/films/:id/addreview'
          element={<PrivateRoute authorizationStatus={authorizationStatus}>< AddReview /></PrivateRoute>}
        />

        <Route
          path='/player/:id'
          element={< Player />}
        />


      </Routes>
    </HistoryRouter>
  );
}
export default App;
