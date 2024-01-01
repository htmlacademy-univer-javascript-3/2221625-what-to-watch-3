import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import FilmList from '../../components/film-list/film-list';
import MyListButton from '../../components/my-list-button/mylist-button';
import { fetchCurrentFilm, fetchCurrentFilmRecomends, fetchCurrentFilmReviews } from '../../store/api-actions';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { store } from '../../store/index';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import Header from '../../components/header/header';
import { useState } from 'react';
import LoadingPage from '../loading-page/loading-page';
import { getCurrentFilm, getCurrentFilmDataLoadingStatus, getCurrentFilmRecomends, getCurrentFilmRecomendsDataLoadingStatus, getCurrentFilmReviews, getCurrentFilmReviewsDataLoadingStatus } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function MoviePage():JSX.Element{
  const params = useParams();

  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchAndDispatchCurrentFilm = useCallback((id: string) => {
    store.dispatch(fetchCurrentFilm(id));
    store.dispatch(fetchCurrentFilmReviews(id));
    store.dispatch(fetchCurrentFilmRecomends(id));
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (params.id && !dataLoaded) {
      fetchAndDispatchCurrentFilm(params.id);
    }
  }, [params.id, fetchAndDispatchCurrentFilm, dataLoaded]);
  const currentFilm = useAppSelector(getCurrentFilm);
  const currentFilmReviews = useAppSelector(getCurrentFilmReviews);
  const currentFilmRecomends = useAppSelector(getCurrentFilmRecomends);

  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  function playerClick() {
    navigate(`/player/${currentFilm?.id ?? ''}`);
  }


  const isFilmLoaded = useAppSelector(getCurrentFilmDataLoadingStatus);
  const isFilmReviewsLoaded = useAppSelector(getCurrentFilmReviewsDataLoadingStatus);
  const isFilmRecomendsLoaded = useAppSelector(getCurrentFilmRecomendsDataLoadingStatus);

  if (isFilmLoaded || isFilmReviewsLoaded || isFilmRecomendsLoaded) {
    return(<LoadingPage/>);
  }


  return(
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm?.backgroundImage} alt={currentFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" data-testid="play-button" onClick={playerClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton FilmId={params.id || 'empty' }/>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link
                    to={currentFilm?.id ? `/films/${currentFilm.id}/addreview` : '/'}
                    className="btn film-card__button"
                  >
                Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs currentFilmComp={currentFilm} currentReviews={currentFilmReviews}></Tabs>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {<FilmList filmComps={currentFilmRecomends.slice(0, 4)} ></FilmList>}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to='/' className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );

}
export default MoviePage;
