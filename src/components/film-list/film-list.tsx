import Card from '../card/card';
type FilmComp = {
  name: string;
  date: string;
  genre: string;
  id:string;
  cardImgPath:string;
  posterImgPath:string;
  bgImgPath:string;
  videoPath:string;
  playerPoster:string;
  description:string;
  score:string;
  ratingCount:string;
  director:string;
  starring:string;
}
function FilmList({ filmComps }: { filmComps: FilmComp[]}): JSX.Element {
  return (
    <>
      {filmComps.map((element) => (
        <Card
          key={`Film ${element.id}`}
          id={element.id}
          imgPath={element.cardImgPath}
          imgName={element.name}
          videoPath={element.videoPath}
        />
      ))}
    </>
  );
}
export default FilmList;
