import { useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/film-data/selectors';
import { useParams } from 'react-router-dom';
import { store } from '../../store/index';
import { fetchCurrentFilm } from '../../store/api-actions';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime, handleProgressBarClick } from './player-utils';


function Player(): JSX.Element{
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      {isLoading && <div data-testid="loader">Loading...</div>}
      <video
        src={currentFilmComp.videoLink}
        className="player__video"
        id={currentFilmComp.id}
        data-testid="player-video"
        poster={currentFilmComp.posterImage}
        autoPlay
        muted
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onLoadStart={() => setIsLoading(true)}
        onLoadedMetadata={() => setIsLoading(false)}
      />
    </>
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
              onClick={(e) => handleProgressBarClick(e, document.getElementById(currentFilmComp.id) as HTMLVideoElement,duration,setCurrentTime)}
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
          <button type="button" className="player__play" data-testid="play-pause-button" onClick={playPauseClick}>
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
          <div className="player__name">{currentFilmComp.name}</div>

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

