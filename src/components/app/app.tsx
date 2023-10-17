import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import FilmList from '../film-list/film-list';

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


type MainFilmProps = {
  films: {
    name: string;
    date: string;
    genre: string;
    id:string;
    cardImgPath:string;
    posterImgPath:string;
    bgImgPath:string;
    video:string;
    playerPoster:string;
  }[];
}

function App(props:MainFilmProps): JSX.Element{

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={< Main Cards={<FilmList filmComps={props.films}></FilmList>} name={props.films[0].name} date={props.films[0].date} genre={props.films[0].genre} bgImgPath={props.films[0].bgImgPath} posterImgPath={props.films[0].posterImgPath}/>}
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
          element={< MoviePage filmComps={props.films}/>}
        />
        <Route
          path='/films/:id/addreview'
          element={< AddReview filmComps={props.films}/>}
        />
        <Route
          path='/player/:id'
          element={< Player filmComps={props.films}/>}
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
