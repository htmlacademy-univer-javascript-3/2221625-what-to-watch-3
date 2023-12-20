export function formatTime(time: number): string {

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


export const handleProgressBarClick = (
  e: React.MouseEvent<HTMLProgressElement>,
  video: HTMLVideoElement,
  duration: number,
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
) => {
  const progressBar = e.currentTarget;
  const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
  const newPosition = (clickPosition / progressBar.clientWidth) * 100;
  const newTime = (newPosition / 100) * duration;

  if (video) {
    video.currentTime = newTime;
    setCurrentTime(newTime);
  }
  video.play();
};
