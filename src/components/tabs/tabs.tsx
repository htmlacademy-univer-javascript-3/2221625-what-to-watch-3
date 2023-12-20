import { useState } from 'react';
import OverviewTab from './overview-tab/overview-tab';
import DetailTab from './details-tab/details-tab';
import ReviewsTab from './reviews-tab/reviews-tab';
import { FilmComp, Review } from '../../types/film';


type TabsProps = {
  currentFilmComp: FilmComp;
  currentReviews: Review[];
}


function Tabs({currentFilmComp,currentReviews} : TabsProps) :JSX.Element{
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const buttonStyles = {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    cursor: 'pointer',
  };

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big" data-testid="posterContainer">
          <img src={currentFilmComp.posterImage} alt={`${currentFilmComp.name } poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              <li className={`film-nav__item ${activeTab === 'overview' ? 'film-nav__item--active' : ''}`}>
                <button style={buttonStyles} className="film-nav__link" onClick={() => handleTabClick('overview')}>Overview</button>
              </li>
              <li className={`film-nav__item ${activeTab === 'details' ? 'film-nav__item--active' : ''}`}>
                <button style={buttonStyles} className="film-nav__link" onClick={() => handleTabClick('details')}>Details</button>
              </li>
              <li className={`film-nav__item ${activeTab === 'reviews' ? 'film-nav__item--active' : ''}`}>
                <button style={buttonStyles} className="film-nav__link" onClick={() => handleTabClick('reviews')}>Reviews</button>
              </li>
            </ul>
          </nav>

          {activeTab === 'overview' && (
            <OverviewTab score={currentFilmComp?.rating} ratingCount={currentFilmComp?.scoresCount} description={currentFilmComp?.description} director={currentFilmComp?.director} starring={currentFilmComp.starring}/>
          )}

          {activeTab === 'details' && (
            <DetailTab director={currentFilmComp.director} starring={currentFilmComp.starring} runtime={currentFilmComp.runTime} genre={currentFilmComp?.genre} date={currentFilmComp.released}/>
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab reviews={currentReviews} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Tabs;
