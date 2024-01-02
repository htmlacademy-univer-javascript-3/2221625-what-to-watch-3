import { useAppSelector } from '../../hooks';
import { store } from '../../store/index';
import { getFavoriteFilms } from '../../store/film-data/selectors';
import { changeFilmStatus } from '../../store/api-actions';
interface MyListButtonProps {
    FilmId: string;
  }
function MyListButton({FilmId}: MyListButtonProps): JSX.Element{

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavorite = favoriteFilms.some((film) => film.id === FilmId);
  function myListClick() {
    store.dispatch(changeFilmStatus(FilmId));
  }

  return(
    <button className="btn btn--list film-card__button" type="button" onClick={myListClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>

  );


}
export default MyListButton;
