import Main from '../../pages/main/main';
//import AddReview from '../../pages/add-review/add-review';
//import HeadGuest from '../../pages/head-guest/head-guest';
//import MoviePageDetails from '../../pages/movie-page-details/movie-page-details';
//import MoviePageInList from '../../pages/movie-page-in-list/movie-page-in-list';
//import MoviePageRreviews from '../../pages/movie-page-reviews/movie-page-reviews';
//import MoviePage from '../../pages/movie-page/movie-page';
//import MyList from '../../pages/my-list/my-list';
//import PlayerPause from '../../pages/player-pause/player-pause';
//import Player from '../../pages/player/player';
//import SignInError from '../../pages/sign-in-error/sign-in-error';
//import SignInMessage from '../../pages/sign-in-message/sign-in-message';
//import SignIn from '../../pages/sign-in/sign-in';
import Card from '../card/card';


const imgComps = [
  {imgPath:'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',imgName:'Fantastic Beasts: The Crimes of Grindelwald'},
  {imgPath:'img/bohemian-rhapsody.jpg',imgName:'Bohemian Rhapsody'},
  {imgPath:'img/macbeth.jpg',imgName:'Macbeth'},
  {imgPath:'img/aviator.jpg',imgName:'Aviator'},
  {imgPath:'img/we-need-to-talk-about-kevin.jpg',imgName:'We need to talk about Kevin'},
  {imgPath:'img/what-we-do-in-the-shadows.jpg',imgName:'What We Do in the Shadows'},
  {imgPath:'img/revenant.jpg',imgName:'Revenant'},
  {imgPath:'img/johnny-english.jpg',imgName:'Johnny English'},
  {imgPath:'img/shutter-island.jpg',imgName:'Shutter Island'},
  {imgPath:'img/pulp-fiction.jpg',imgName:'Pulp Fiction'},
  {imgPath:'img/no-country-for-old-men.jpg',imgName:'No Country for Old Men'},
  {imgPath:'img/snatch.jpg',imgName:'Snatch'},
  {imgPath:'img/moonrise-kingdom.jpg',imgName:'Moonrise Kingdom'},
  {imgPath:'img/seven-years-in-tibet.jpg',imgName:'Seven Years in Tibet'},
  {imgPath:'img/midnight-special.jpg',imgName:'Midnight Special'},
  {imgPath:'img/war-of-the-worlds.jpg',imgName:'War of the Worlds'},
  {imgPath:'img/dardjeeling-limited.jpg',imgName:'Dardjeeling Limited'},
  {imgPath:'img/orlando.jpg',imgName:'Orlando'},
  {imgPath:'img/mindhunter.jpg',imgName:'Mindhunter'},
  {imgPath:'img/midnight-special.jpg',imgName:'Midnight Special'},
];

type MainFilmProps = {
  name :string;
  date :string;
  genre :string;
}

function App(props:MainFilmProps): JSX.Element{
  const Cards :JSX.Element[] = imgComps.map((element, index) =>
    <Card key={`Film ${String(index)}`} imgPath={element.imgPath} imgName={element.imgName}/>
  );
  return(

    < Main Cards={Cards} name={props.name} date={props.date} genre={props.genre} />
  );
}
export default App;
