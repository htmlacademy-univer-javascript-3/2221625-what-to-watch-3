import { useNavigate } from 'react-router-dom';
import TabsGenres from '../../components/list-genres/tabs-genres';
import Header from '../../components/header/header';
import MyListButton from '../../components/myList-button/myList-button';
import { useAppSelector } from '../../hooks';
import {  getPromoFilm } from '../../store/film-data/selectors';
import { useMemo } from 'react';

function Main(): JSX.Element{
  const promoFilm = useAppSelector((state) => getPromoFilm(state));
  const memoizedPromoFilm = useMemo(() => promoFilm, [promoFilm]);
  
  const navigate = useNavigate();
  function playerClick() {
    navigate(`/player/${memoizedPromoFilm.id}`); 
  }

  return(
    <main>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={memoizedPromoFilm.backgroundImage} alt={memoizedPromoFilm.name} />
        </div>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={memoizedPromoFilm.posterImage ?? ''} alt={`${memoizedPromoFilm.name ?? ''} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{memoizedPromoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{memoizedPromoFilm.genre}</span>
                <span className="film-card__year">{memoizedPromoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={playerClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton FilmId={memoizedPromoFilm.id}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <TabsGenres/>

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
