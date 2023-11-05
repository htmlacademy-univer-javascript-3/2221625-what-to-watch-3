import Main from '../../pages/main/main';

import MyList from '../../pages/my-list/my-list';
import {useAppSelector} from '../../hooks';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import { useSelector } from 'react-redux';
import {State} from '../../types/state'



import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'}
import PrivateRoute from '../private-route/private-route';

type Review ={
  text: string;
  author:string;
  date: string;
  rating: string;
}
type FilmReviews={
  id: string;
  reviews: Review[];
}


type MainFilmProps = {
  reviews: FilmReviews[];
}

function App(props:MainFilmProps): JSX.Element{
  const appState = useSelector((state:State) => state);
  
  const filmComps = appState.filtredFilmComps;
  const promoFilm = appState.promoFilm;
  

  /*
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isQuestionsDataLoading = useAppSelector(getQuestionsDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  if (!isAuthChecked || isQuestionsDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  
  if (hasError) {
    return (
      <ErrorScreen />);
  }
  */

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={< Main filmComps={filmComps} promoFilm={promoFilm} />}
        />
        <Route
          path='/login'
          element={< SignIn/>}
        />
        <Route
          path='/mylist'
          element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>< MyList/></PrivateRoute>}
        />
        {/*
        <Route
          path='/films/:id'
          element={< MoviePage />}
        />

        <Route
          path='/films/:id/addreview'
          element={< AddReview />}
        />
        <Route
          path='/player/:id'
          element={< Player />}
        />
  */}
        <Route
          path="*"
          element={<Page404/>}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
