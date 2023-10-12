import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
//import HeadGuest from '../../pages/head-guest/head-guest';
//import MoviePageDetails from '../../pages/movie-page-details/movie-page-details';
//import MoviePageInList from '../../pages/movie-page-in-list/movie-page-in-list';
//import MoviePageRreviews from '../../pages/movie-page-reviews/movie-page-reviews';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
//import PlayerPause from '../../pages/player-pause/player-pause';
import Player from '../../pages/player/player';
//import SignInError from '../../pages/sign-in-error/sign-in-error';
//import SignInMessage from '../../pages/sign-in-message/sign-in-message';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/404-page/404-page';
import Card from '../card/card';
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


const imgComps = [
  {id: '1',imgPath:'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',imgName:'Fantastic Beasts: The Crimes of Grindelwald'},
  {id: '2',imgPath:'img/bohemian-rhapsody.jpg',imgName:'Bohemian Rhapsody'},
  {id: '3',imgPath:'img/macbeth.jpg',imgName:'Macbeth'},
  {id: '4',imgPath:'img/aviator.jpg',imgName:'Aviator'},
  {id: '5',imgPath:'img/we-need-to-talk-about-kevin.jpg',imgName:'We need to talk about Kevin'},
  {id: '6',imgPath:'img/what-we-do-in-the-shadows.jpg',imgName:'What We Do in the Shadows'},
  {id: '7',imgPath:'img/revenant.jpg',imgName:'Revenant'},
  {id: '8',imgPath:'img/johnny-english.jpg',imgName:'Johnny English'},
  {id: '9',imgPath:'img/shutter-island.jpg',imgName:'Shutter Island'},
  {id: '10',imgPath:'img/pulp-fiction.jpg',imgName:'Pulp Fiction'},
  {id: '11',imgPath:'img/no-country-for-old-men.jpg',imgName:'No Country for Old Men'},
  {id: '12',imgPath:'img/snatch.jpg',imgName:'Snatch'},
  {id: '13',imgPath:'img/moonrise-kingdom.jpg',imgName:'Moonrise Kingdom'},
  {id: '14',imgPath:'img/seven-years-in-tibet.jpg',imgName:'Seven Years in Tibet'},
  {id: '15',imgPath:'img/midnight-special.jpg',imgName:'Midnight Special'},
  {id: '16',imgPath:'img/war-of-the-worlds.jpg',imgName:'War of the Worlds'},
  {id: '17',imgPath:'img/dardjeeling-limited.jpg',imgName:'Dardjeeling Limited'},
  {id: '18',imgPath:'img/orlando.jpg',imgName:'Orlando'},
  {id: '19',imgPath:'img/mindhunter.jpg',imgName:'Mindhunter'},
  {id: '20',imgPath:'img/midnight-special.jpg',imgName:'Midnight Special'},
];

type MainFilmProps = {
  name: string;
  date: string;
  genre: string;
}

function App(props:MainFilmProps): JSX.Element{
  const Cards = imgComps.map((element) =>
    <Card key={`Film ${element.id}`} imgPath={element.imgPath} imgName={element.imgName}/>
  );
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={< Main Cards={Cards} name={props.name} date={props.date} genre={props.genre} />}
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
          element={< MoviePage imgComps={imgComps}/>}
        />
        <Route
          path='/films/:id/addreview'
          element={< AddReview imgComps={imgComps}/>}
        />
        <Route
          path='/player/:id'
          element={< Player imgComps={imgComps}/>}
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
