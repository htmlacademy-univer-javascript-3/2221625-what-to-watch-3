import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import FilmList from '../../components/film-list/film-list';
import { useDispatch } from 'react-redux';
import { setID } from '../../store/action';
import { fetchCurrentFilm, fetchCurrentFilmRecomends, fetchCurrentFilmReviews } from '../../store/api-actions';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';



function MoviePage():JSX.Element{
  const params = useParams();
  const dispatch = useDispatch();
  

  const fetchAndDispatchCurrentFilm = (id: string) => {
    dispatch(setID(id));
    dispatch(fetchCurrentFilm(id));
    dispatch(fetchCurrentFilmReviews(id));
    dispatch(fetchCurrentFilmRecomends(id));
  };

  useEffect(() => {
    if (params.id) {
      fetchAndDispatchCurrentFilm(params.id);
    }
  }, [params.id]);

  const appState = useSelector((state:State) => state);
  
  const currentFilmComp = appState.currentFilm;
  const currentReviews = appState.currentFilmReviews;
  const currentRecomends = appState.currentFilmRecomends;

  






  const navigate = useNavigate();
  function playerClick() {
    navigate(`/player/${currentFilmComp?.id ?? ''}`);
  }

  return(
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilmComp?.bgImgPath} alt={currentFilmComp?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilmComp?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilmComp?.genre}</span>
                <span className="film-card__year">{currentFilmComp?.date}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={playerClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={currentFilmComp?.id ? `/films/${currentFilmComp.id}/addreview` : '/'} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <Tabs currentFilmComp={currentFilmComp} currentReviews={currentReviews}></Tabs>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {<FilmList {...currentRecomends.slice(0, 4)} ></FilmList>}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
