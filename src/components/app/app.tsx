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
import { useSelector } from 'react-redux';
import {State} from '../../types/state'
import LoadingPage from '../../pages/LoadingPage/LoadingPage';


 
import {
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
  const isFilmCompsLoaded=useAppSelector((state)=>state.isFilmCompsLoaded);
  const authorizationStatus=useAppSelector((state)=>state.authorizationStatus);

 if (isFilmCompsLoaded || authorizationStatus=== AuthorizationStatus.Unknown)
  return(<LoadingPage/>)


  return(
    <HistoryRouter history={browserHistory}>
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
          element={<PrivateRoute authorizationStatus={authorizationStatus}>< MyList/></PrivateRoute>}
        />
       
        <Route
          path='/films/:id'
          element={< MoviePage />}
        />
        {/*
        <Route
          path='/films/:id/addreview'
          element={< AddReview />}
        />
        <Route
          path='/player/:id'
          element={< Player />}
        />
 
        <Route
          path="*"
          element={<Page404/>}
        />
        */}

      </Routes>
    </HistoryRouter>
  );
}
export default App;
