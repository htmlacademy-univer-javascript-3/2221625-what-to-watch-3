
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGenre } from '../../store/action';
import ListGenres from '../../components/list-genres/list-genres';
import Header from '../../components/header/header';
import {FilmCard, PromoFilm} from '../../types/film'


type MainProps = {
  filmComps: FilmCard[];
  promoFilm: PromoFilm;
}


function Main(props: MainProps): JSX.Element{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGenre('All genres'));
  }, [dispatch]);

  function playerClick() {
    navigate('/player/0');
  }
  return(
    <main>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={props.promoFilm.backgroundImage} alt={props.promoFilm.name} />
        </div>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={props.promoFilm.posterImage ?? ''} alt={`${props.promoFilm.name ?? ''} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.promoFilm.genre}</span>
                <span className="film-card__year">{props.promoFilm.released}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <ListGenres filmComps={props.filmComps} />

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
