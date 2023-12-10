type VideoProps={
    videoId: string;
    videoPath: string;
    mute: boolean;
  }
function VideoPlayer({ videoId, videoPath,mute }: VideoProps): JSX.Element{
  return (
    <video src={videoPath} width="280" height="175" muted={mute} id={videoId} data-testid={"videoTestID "+videoId} autoPlay loop />
  );
}

export default VideoPlayer;
