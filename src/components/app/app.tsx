import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import MyList from '../../pages/mylist/mylist';
import {HelmetProvider} from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import LoadingPage from '../../pages/loading-page/loading-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchFavoriteFilms } from '../../store/api-actions';
import { store } from '../../store/index';
import { useEffect } from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import PrivateRoute from '../private-route/private-route';
import { getFilmCardsDataLoadingStatus } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';


function App(): JSX.Element{

  const isFilmsLoading = useAppSelector(getFilmCardsDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    let isMounted = true;
    if (authorizationStatus === AuthorizationStatus.Auth && isMounted) {
      store.dispatch(fetchFavoriteFilms());
    }
    return () => {
      isMounted = false;
    };
  }, [authorizationStatus]);

  if (isFilmsLoading || authorizationStatus === AuthorizationStatus.Unknown) {

    return(<LoadingPage/>);
  }


  return(
    <HelmetProvider>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element={<Main/>}
        />
        <Route
          path={AppRoute.Login}
          element={<SignIn/>}
        />
        <Route
          path={AppRoute.MyList}
          element={<PrivateRoute><MyList/></PrivateRoute>}
        />

        <Route
          path={AppRoute.MoviePage}
          element={< MoviePage/>}
        />
        <Route
          path={AppRoute.Page404}
          element={<Page404/>}
        />

        <Route
          path={AppRoute.AddReview}
          element={<PrivateRoute><AddReview/></PrivateRoute>}
        />

        <Route
          path={AppRoute.Player}
          element={<Player/>}
        />


      </Routes>
    </HelmetProvider>
  );
}
export default App;
