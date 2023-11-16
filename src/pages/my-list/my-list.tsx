import Header from "../../components/header/header";
import FilmList from '../../components/film-list/film-list';
import { useSelector } from 'react-redux';
import {State} from '../../types/state'

function MyList():JSX.Element{
  const appState = useSelector((state:State) => state);
  
  const favoriteComps = appState.favoriteFilms;
  return(
    <div className="user-page">
     
      <Header>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteComps.length}</span></h1>
      </Header>
      
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList filmComps={favoriteComps} />
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
  );

}
export default MyList;
