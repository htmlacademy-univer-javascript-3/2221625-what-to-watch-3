import { useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/film-data/selectors';
import { useParams } from 'react-router-dom';
import { store } from '../../store/index';
import { fetchCurrentFilm } from '../../store/api-actions';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}

function Player(): JSX.Element{
  const navigate = useNavigate();

  const params = useParams();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fetchAndDispatchCurrentFilm = useCallback((id: string) => {
    store.dispatch(fetchCurrentFilm(id));
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (params.id && !dataLoaded) {
      fetchAndDispatchCurrentFilm(params.id);
    }
  }, [params.id, fetchAndDispatchCurrentFilm, dataLoaded]);

  const currentFilmComp = useAppSelector(getCurrentFilm);
  const videoElement = currentFilmComp ? (
    <video
      src={currentFilmComp.videoLink}
      className="player__video"
      id={currentFilmComp.id}
      poster={currentFilmComp.posterImage}
      autoPlay
      muted
      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      onDurationChange={(e) => setDuration(e.currentTarget.duration)}
    />
  ) : null;

  const playPauseClick = () => {
    const video = document.getElementById(currentFilmComp.id) as HTMLVideoElement;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const exitClick = () => {
    navigate(`/films/${params.id || ''}`);
  };

  const fullScreenClick = () => {
    const video = document.getElementById(currentFilmComp.id) as HTMLVideoElement;

    if (video) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    }
  };
  const [isDifferenceMode, setIsDifferenceMode] = useState(false);

  const timerClick = () => {

    setIsDifferenceMode(!isDifferenceMode);
  };

  const currentContent = isDifferenceMode
    ? `-${formatTime(Math.abs(duration - currentTime))}`
    : formatTime(currentTime);

  const progressValue = isNaN(duration) || isNaN(currentTime) || duration === 0 ? 0 : (currentTime / duration) * 100;


  const handleProgressBarClick = (e: React.MouseEvent<HTMLProgressElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newPosition = (clickPosition / progressBar.clientWidth) * 100;
    const newTime = (newPosition / 100) * duration;
    const video = document.getElementById(currentFilmComp.id) as HTMLVideoElement;

    if (video) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
    video.play();
  };

  return (
    <div className="player">
      {videoElement}
      <button type="button" className="player__exit" onClick={exitClick}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progressValue}
              max="100"
              onClick={(e) => handleProgressBarClick(e)}
              style={{
                cursor: 'pointer',
              }}
            >
            </progress>
            <div className="player__toggler" style={{ left: `${progressValue}%` }}>
              Toggler
            </div>
          </div>
          <div
            className="player__time-value"
            onClick={timerClick}
            style={{
              cursor: 'pointer',
            }}
          >
            {currentContent}
          </div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={playPauseClick}>
            {isPlaying ? (
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            )}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={fullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;

