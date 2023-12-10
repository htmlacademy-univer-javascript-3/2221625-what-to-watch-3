import { useState } from 'react';
import { useMemo } from 'react';
import ListGenresFilms from './list-genres-films';

function TabsGenres(): JSX.Element{
  const [activeTab, setActiveTab] = useState('All genres');
  const handleGenreClick = (tabName: string) => {
    setActiveTab(tabName);
  };




  const memoizedListGenresFilms = useMemo(() => <ListGenresFilms activeTab={activeTab} />, [activeTab]);
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${activeTab === 'All genres' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('All genres')}>All genres</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Fantasy' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Fantasy')}>Fantasy</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Comedy' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Comedy')}>Comedy</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Action' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Action')}>Action</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Drama' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Drama')}>Drama</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Crime' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Crime')}>Crime</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Adventure' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Adventure')}>Adventure</a>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Thriller' ? 'catalog__genres-item--active' : ''}`}>
          <a className="catalog__genres-link" onClick={() => handleGenreClick('Thriller')}>Thriller</a>
        </li>
      </ul>

      {memoizedListGenresFilms}
    </section>
  );
}

export default TabsGenres;
