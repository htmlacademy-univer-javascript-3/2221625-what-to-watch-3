import Card from '../card/card';
import { FilmCard } from '../../types/film';

function FilmList({ filmComps }: { filmComps: FilmCard[] }): JSX.Element {
  return (
    <>
      {filmComps.map((element) => (
        <Card
          key={`Film ${element.id}`}
          cardProps={element}
        />
      ))}
    </>
  );
}

export default FilmList;
