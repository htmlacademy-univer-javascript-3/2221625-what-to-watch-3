import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import { useSelector } from 'react-redux';

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

type FilmComp = {
  id:string;
  name: string;
  date: string;
  genre: string;
  cardImgPath:string;
  posterImgPath:string;
  bgImgPath:string;
  videoPath:string;
  playerPoster:string;
  description:string;
  score:string;
  ratingCount:string;
  director:string;
  starring:string;
  runtime:string;
}
type AppState = {
  genre: string | undefined;
  filmComps: FilmComp[];
  mainFilm:FilmComp | undefined;
  more :number;
}

type MainFilmProps = {
  reviews: FilmReviews[];
}

function App(props:MainFilmProps): JSX.Element{
  const appState = useSelector((state:AppState) => state);
  const filmComps = appState.filmComps;
  const mainFilm = appState.mainFilm;
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={< Main filmComps={filmComps.filter((element) => element.id !== '0')} name={mainFilm?.name} date={mainFilm?.date} genre={mainFilm?.genre} bgImgPath={mainFilm?.bgImgPath} posterImgPath={mainFilm?.posterImgPath}/>}
        />
        <Route
          path='/login'
          element={< SignIn/>}
        />
        <Route
          path='/mylist'
          element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>< MyList/></PrivateRoute>}
        />
        <Route
          path='/films/:id'
          element={< MoviePage filmComps={filmComps} filmReviewsList={props.reviews}/>}
        />

        <Route
          path='/films/:id/addreview'
          element={< AddReview filmComps={filmComps}/>}
        />
        <Route
          path='/player/:id'
          element={< Player filmComps={filmComps}/>}
        />
        <Route
          path="*"
          element={<Page404/>}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
