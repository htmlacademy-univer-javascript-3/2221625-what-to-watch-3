import { useState} from 'react';
import { Link } from 'react-router-dom';
import OverviewTab from './overview-tab/overview-tab';
import DetailTab from './details-tab/details-tab';
import ReviewsTab from './reviews-tab/reviews-tab';

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
type ReviewsProps = {
  text: string;
  author: string;
  date: string;
  rating: string;
}
type FilmReviews={
  id: string;
  reviews: ReviewsProps[];
}
type TabsProps = {
  currentFilmComp: FilmComp | undefined;
  currentReviews: FilmReviews | undefined;
}


function Tabs({currentFilmComp,currentReviews} : TabsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={currentFilmComp?.posterImgPath} alt={`${currentFilmComp?.name || 'None'} poster`} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              <li className={`film-nav__item ${activeTab === 'overview' ? 'film-nav__item--active' : ''}`}>
                <Link to={`/films/${currentFilmComp?.id ?? ''}`} className="film-nav__link" onClick={() => handleTabClick('overview')}>Overview</Link>
              </li>
              <li className={`film-nav__item ${activeTab === 'details' ? 'film-nav__item--active' : ''}`}>
                <Link to={`/films/${currentFilmComp?.id ?? ''}`} className="film-nav__link" onClick={() => handleTabClick('details')}>Details</Link>
              </li>
              <li className={`film-nav__item ${activeTab === 'reviews' ? 'film-nav__item--active' : ''}`}>
                <Link to={`/films/${currentFilmComp?.id ?? ''}`} className="film-nav__link" onClick={() => handleTabClick('reviews')}>Reviews</Link>
              </li>
            </ul>
          </nav>

          {activeTab === 'overview' && (
            <OverviewTab score={currentFilmComp?.score} ratingCount={currentFilmComp?.ratingCount} description={currentFilmComp?.description} director={currentFilmComp?.director} starring={currentFilmComp?.starring}/>
          )}

          {activeTab === 'details' && (
            <DetailTab director={currentFilmComp?.director}  starring={currentFilmComp?.starring} runtime={currentFilmComp?.runtime} genre={currentFilmComp?.genre} date={currentFilmComp?.date}/>
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab reviews={currentReviews?.reviews || []} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Tabs;
