import Main from '../../pages/main/main';
import Card from '../card/card';


const imgComps= [
  {imgPath:"img/fantastic-beasts-the-crimes-of-grindelwald.jpg",imgName:"Fantastic Beasts: The Crimes of Grindelwald"},
  {imgPath:"img/bohemian-rhapsody.jpg",imgName:"Bohemian Rhapsody"},
  {imgPath:"img/macbeth.jpg",imgName:"Macbeth"},
  {imgPath:"img/aviator.jpg",imgName:"Aviator"},
  {imgPath:"img/we-need-to-talk-about-kevin.jpg",imgName:"We need to talk about Kevin"},
  {imgPath:"img/what-we-do-in-the-shadows.jpg",imgName:"What We Do in the Shadows"},
  {imgPath:"img/revenant.jpg",imgName:"Revenant"},
  {imgPath:"img/johnny-english.jpg",imgName:"Johnny English"},
  {imgPath:"img/shutter-island.jpg",imgName:"Shutter Island"},
  {imgPath:"img/pulp-fiction.jpg",imgName:"Pulp Fiction"},
  {imgPath:"img/no-country-for-old-men.jpg",imgName:"No Country for Old Men"},
  {imgPath:"img/snatch.jpg",imgName:"Snatch"},
  {imgPath:"img/moonrise-kingdom.jpg",imgName:"Moonrise Kingdom"},
  {imgPath:"img/seven-years-in-tibet.jpg",imgName:"Seven Years in Tibet"},
  {imgPath:"img/midnight-special.jpg",imgName:"Midnight Special"},
  {imgPath:"img/war-of-the-worlds.jpg",imgName:"War of the Worlds"},
  {imgPath:"img/dardjeeling-limited.jpg",imgName:"Dardjeeling Limited"},
  {imgPath:"img/orlando.jpg",imgName:"Orlando"},
  {imgPath:"img/mindhunter.jpg",imgName:"Mindhunter"},
  {imgPath:"img/midnight-special.jpg",imgName:"Midnight Special"},
]

const Cards :JSX.Element[] = imgComps.map((element) =>
<Card imgPath={element.imgPath} imgName={element.imgName}/>
);

type  MainFilmProps = {
  name :string,
  date :string,
  genre :string
}
function App(props:MainFilmProps): JSX.Element{
   
    return(
      < Main Cards={Cards} name={props.name} date={props.date} genre={props.genre}  />
    );
}
export default App