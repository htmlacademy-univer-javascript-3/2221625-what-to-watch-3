import Card from '../card/card';
import { FilmCard } from '../../types/film';


function FilmList(filmListProps : FilmCard[]): JSX.Element {
  return (
    <>
      {filmListProps.map((element) => (
        <Card
          key={`Film ${element.id}`}
          {...element}
        />
      ))}
    </>
  );
}

export default FilmList;