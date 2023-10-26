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
function FilmList({ filmComps, genre }: { filmComps: Array<FilmComp>, genre: string | undefined}):JSX.Element{
  return(
    <>
      {genre !== undefined ? (
      filmComps
        .filter((element) => element.genre === genre)
        .slice(0, 4)
        .map((element) => (
          <Card
            key={`Film ${element.id}`}
            id={element.id}
            imgPath={element.cardImgPath}
            imgName={element.name}
            videoPath={element.videoPath}
          />
        ))
    ) : (
        filmComps.map((element) => {
          if (element.id !== '0') {
            return <Card key={`Film ${element.id}`} id={element.id} imgPath={element.cardImgPath} imgName={element.name} videoPath={element.videoPath} />;
          }
          
        })
      )}
    </>
  );
}
export default FilmList;
