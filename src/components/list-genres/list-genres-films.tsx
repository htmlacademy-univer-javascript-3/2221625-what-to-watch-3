import FilmList from '../film-list/film-list';
import { memo, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setGenre, setMore } from '../../store/film-data/film-data';
import { getMore } from '../../store/film-data/selectors';
import { useAppSelector } from '../../hooks';
import { getFilmCards } from '../../store/film-data/selectors';

type ListGenresProps = {
  activeTab: string;
}

const ListGenresFilms: React.FC<ListGenresProps> = memo((props: ListGenresProps) => {
  const dispatch = useDispatch();
  const more = useAppSelector(getMore);
  const films = useAppSelector(getFilmCards);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(setGenre(props.activeTab));
    }
    return () => {
      isMounted = false;
    };
  }, [props.activeTab, dispatch]);

  const buttonStyles = {
    display: more < 0 ? 'none' : 'block',
  };

  function handleButtonClick() {
    dispatch(setMore(8));
  }
  return (
    <>
      <div className="catalog__films-list">
        <FilmList filmComps={films} ></FilmList>
      </div>
      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={() => handleButtonClick()} style={buttonStyles}>Show more</button>
      </div>
    </>
  );
});
ListGenresFilms.displayName = 'ListGenresFilmsMemo';
export default ListGenresFilms;
