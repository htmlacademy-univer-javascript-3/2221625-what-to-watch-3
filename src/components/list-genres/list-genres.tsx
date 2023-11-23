import { memo,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmList from '../film-list/film-list';
import { useDispatch } from 'react-redux';
import { setGenre, setMore } from '../../store/film-data/film-data';
import {FilmCard} from '../../types/film';
import { getMore } from '../../store/film-data/selectors';
import { useAppSelector } from '../../hooks';
type ListGenresProps = {
  filmComps: FilmCard[];
}

function ListGenres(props: ListGenresProps) {
  const [activeTab, setActiveTab] = useState('All genres');

  const more = useAppSelector(getMore);

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
        <li className={`catalog__genres-item ${activeTab === 'Fantasy' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Fantasy')}>Fantasy</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Comedy' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Comedy')}>Comedy</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Action' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Action')}>Action</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Drama' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Drama')}>Drama</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Crime' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Crime')}>Crime</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Adventure' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Adventure')}>Adventure</Link>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Thriller' ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link" onClick={() => handleGenreClick('Thriller')}>Thriller</Link>
        </li>
      </ul>

      <div className="catalog__films-list">
        <FilmList filmComps={props.filmComps} ></FilmList>
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={() => handleButtonClick()} style={buttonStyles}>Show more</button>
      </div>
    </section>
  );
}

export default memo(ListGenres);
