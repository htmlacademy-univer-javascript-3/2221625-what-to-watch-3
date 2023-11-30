
import { useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGenre} from '../../store/film-data/film-data';
import ListGenres from '../../components/list-genres/list-genres';
import Header from '../../components/header/header';
import { addFavoriteFilm} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import { store } from '../../store/index';
import { getFavoriteFilms, getFilms, getPromoFilm } from '../../store/film-data/selectors';


function Main(): JSX.Element{
  const films = useAppSelector(getFilms);
  const promoFilm = useAppSelector(getPromoFilm);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const countFavorite = favoriteFilms.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGenre('All genres'));
  }, [dispatch]);

  function playerClick() {
    navigate('/player/0');
  }

  function myListClick() {
    if (promoFilm.id) {
      store.dispatch(addFavoriteFilm(promoFilm.id));

    }
  }
  const memoizedListGenres = useMemo(() => <ListGenres filmComps={films} />, [films]);

  return(
    <main>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage ?? ''} alt={`${promoFilm.name ?? ''} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={playerClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={myListClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{countFavorite}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {memoizedListGenres}

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </main>
  );
}

export default Main;
