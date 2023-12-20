import { useState } from 'react';
import { useMemo } from 'react';
import ListGenresFilms from './list-genres-films';
function TabsGenres(): JSX.Element{
  const [activeTab, setActiveTab] = useState('All genres');


  const handleGenreClick = (tabName: string) => {
    setActiveTab(tabName);


  };
  const buttonStyles = {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
  };

  const memoizedListGenresFilms = useMemo(() => <ListGenresFilms activeTab={activeTab} />, [activeTab]);
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li className={`catalog__genres-item ${activeTab === 'All genres' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('All genres')}>All genres</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Fantasy' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Fantasy')}>Fantasy</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Comedy' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Comedy')}>Comedy</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Action' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Action')}>Action</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Drama' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Drama')}>Drama</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Crime' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Crime')}>Crime</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Adventure' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Adventure')}>Adventure</button>
        </li>
        <li className={`catalog__genres-item ${activeTab === 'Thriller' ? 'catalog__genres-item--active' : ''}`}>
          <button style={buttonStyles} className="catalog__genres-link" onClick={() => handleGenreClick('Thriller')}>Thriller</button>
        </li>
      </ul>

      {memoizedListGenresFilms}
    </section>
  );
}

export default TabsGenres;
