import { formatTime, handleProgressBarClick } from './player-utils';

describe(' Player utils', () => {
  it('should format time correctly', () => {
    const formattedTime = formatTime(3660);
    expect(formattedTime).toBe('01:01:00');

    const formattedTime2 = formatTime(300);
    expect(formattedTime2).toBe('05:00');
  });

  it('should update video currentTime and play video on progress bar click', () => {
    const mockDuration = 100;
    let currentTime = 0;
    const videoElem = document.createElement('video');
    videoElem.id = 'id';


    const progressElem = document.createElement('progress');
    Object.defineProperty(progressElem, 'clientWidth', { value: 100, writable: true });
    const mockEvent = {
      currentTarget: progressElem ,
      clientX: 50,
    };
    const newPosition = (mockEvent.clientX / mockEvent.currentTarget.clientWidth) * 100;
    const newTime = (newPosition / 100) * mockDuration;
    handleProgressBarClick(
          mockEvent as React.MouseEvent<HTMLProgressElement>,
          videoElem ,
          mockDuration,
          () => {
            currentTime = newTime;
          }
    );

    expect(videoElem.currentTime).toBe(newTime);
    expect(currentTime).toBe(newTime);


  });

});
