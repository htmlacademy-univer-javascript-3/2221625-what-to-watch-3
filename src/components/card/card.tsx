import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
type ImgProps={
  id:string;
  imgPath:string;
  imgName:string;
}

function Card({id,imgPath,imgName}: ImgProps): JSX.Element{
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/films/${id}`);
  }

  return(
    <article className="small-film-card catalog__films-card" onClick={handleClick}>
      <div className="small-film-card__image">
        <img src={imgPath} alt={imgName} width="280" height="175" id={id}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{imgName}</Link>
      </h3>
    </article>);
}
export default Card;
