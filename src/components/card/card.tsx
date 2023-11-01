import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoPlayer from '../videoPlayer/videoPlayer';

type ImgProps={
  id:string;
  imgPath:string;
  imgName:string;
  videoPath:string;
}

function Card({id,imgPath,imgName,videoPath}: ImgProps): JSX.Element{
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [displayedPath, setDisplayedPath] = useState(imgPath);


  function handleClick() {
    navigate(`/films/${id}`);

  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => {
        setDisplayedPath(videoPath);
      }, 1000);
    } else {
      setDisplayedPath(imgPath);
    }
    return () => clearTimeout(timer);
  }, [isHovered, imgPath, videoPath]);

  return(
    <article className="small-film-card catalog__films-card" onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="small-film-card__image">
        {displayedPath === videoPath ? (
          <VideoPlayer videoId={id} videoPath={displayedPath} mute/>
        ) : (
          <img src={displayedPath} alt={imgName} width="280" height="175" id={id} />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{imgName}</Link>
      </h3>
    </article>);
}
export default Card;
