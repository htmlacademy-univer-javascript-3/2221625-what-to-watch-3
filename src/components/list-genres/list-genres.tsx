import { useState} from 'react';
import { Link } from 'react-router-dom';
import FilmList from '../film-list/film-list';
import { useDispatch } from 'react-redux';
import { setGenre, setMore } from '../../store/action';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
type FilmComp = {
    name: string;
    date: string;
    genre: string;
    id:string;
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
type ListGenresProps = {
  filmComps: FilmComp[];
}
type ListState = {
  genre: string | undefined;
  filmComps: FilmComp[];
  mainFilm:FilmComp | undefined;
  more :number;
}
function ListGenres(props: ListGenresProps) {
  const [activeTab, setActiveTab] = useState('All genres');

  const listState = useSelector((state:ListState) => state);
  const more = listState.more;

  const dispatch = useDispatch();

  const handleGenreClick = (tabName: string) => {
    setActiveTab(tabName);
    dispatch(setGenre(tabName));
  };

  const buttonStyles = {
    display: more < 0 ? 'none' : 'block',
  };

  useEffect(() => {
    dispatch(setGenre(activeTab));
  }, [activeTab, dispatch]);

  function handleButtonClick() {
    dispatch(setMore(8));
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${activeTab === 'All genres' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('All genres')}>All genres</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Comedies' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Comedies')}>Comedies</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Crime' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Crime')}>Crime</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Documentary' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Documentary')}>Documentary</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Dramas' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Dramas')}>Dramas</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Horror' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Horror')}>Horror</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Kids & Family' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Kids & Family')}>Kids & Family</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Romance' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Romance')}>Romance</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Sci-Fi' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Sci-Fi')}>Sci-Fi</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Thrillers' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Thrillers')}>Thrillers</Link>
        </li>
      </ul>

      <div className="catalog__films-list">
        { <FilmList filmComps={props.filmComps} ></FilmList>}
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={() => handleButtonClick()} style={buttonStyles}>Show more</button>
      </div>
    </section>
  );
}

export default ListGenres;
