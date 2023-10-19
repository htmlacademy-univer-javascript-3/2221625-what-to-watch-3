import Card from '../card/card';
type FilmComp = {
    name: string;
    date: string;
    genre: string;
    id:string;
    cardImgPath:string;
    posterImgPath:string;
    bgImgPath:string;
    video:string;
    playerPoster:string;
  }
function FilmList({ filmComps }: { filmComps: Array<FilmComp> }):JSX.Element{
  return(
    <>
      {filmComps.map((element) =>{
        if (element.id !== '0') {
          return <Card key={`Film ${element.id}`} id={element.id} imgPath={element.cardImgPath} imgName={element.name}/>;
        }
        return null;
      })}
    </>
  );
}
export default FilmList;
