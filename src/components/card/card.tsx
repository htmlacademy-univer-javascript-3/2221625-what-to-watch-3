import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoPlayer from '../videoPlayer/videoPlayer';
import {FilmCard} from '../../types/film'



function Card({cardProps}: {cardProps:FilmCard}): JSX.Element{
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [displayedPath, setDisplayedPath] = useState(cardProps.previewImage);

  function handleClick() {
    navigate(`/films/${cardProps.id}`);
    
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => {
        setDisplayedPath(cardProps.previewVideoLink);
      }, 1000);
    } else {
      setDisplayedPath(cardProps.previewImage);
    }
    return () => clearTimeout(timer);
  }, [isHovered, cardProps.previewImage, cardProps.previewVideoLink]);

  return(
    <article className="small-film-card catalog__films-card" onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="small-film-card__image">
        {displayedPath === cardProps.previewVideoLink ? (
          <VideoPlayer videoId={cardProps.id} videoPath={displayedPath} mute/>
        ) : (
          <img src={displayedPath} alt={cardProps.name} width="280" height="175" id={cardProps.id} />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${cardProps.id}`}>{cardProps.name}</Link>
      </h3>
    </article>);
}
export default Card;
