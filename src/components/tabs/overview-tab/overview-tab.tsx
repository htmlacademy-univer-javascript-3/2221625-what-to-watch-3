type OverviewProps={
    score: number;
    ratingCount: number;
    description: string;
    director: string ;
    starring: string[];
  }
function OverviewTab({score,ratingCount,description,director,starring}: OverviewProps): JSX.Element{
  const getRatingText = (filmScore: number) => {
    if (filmScore >= 1 && filmScore < 4) {
      return 'Bad';
    } else if (filmScore >= 4 && filmScore < 7) {
      return 'Good';
    } else if (filmScore >= 7 && filmScore <= 10) {
      return 'Very good';
    }
    return '';
  };


  let formattedStarring;

  if (starring && starring.length > 0) {
    if (starring.length > 4) {
      const firstFourActors = starring.slice(0, 4);
      formattedStarring = (
        <>
          {firstFourActors.join(', ')}
          {' and other'}
        </>
      );
    } else {
      formattedStarring = starring.join(', ');
    }
  } else {
    formattedStarring = 'No starring information available.';
  }

  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingText(score)}</span>
          <span className="film-rating__count">{ratingCount}</span>
        </p>
      </div>

      <div className="film-card__text" >
        <div dangerouslySetInnerHTML={{__html:description || ''}}></div>
        <p className="film-card__director" data-testid="owerview Direcrtor"><strong>Director:{director}</strong></p>

        <p className="film-card__starring" data-testid="owerview Starring"><strong>Starring: {formattedStarring}</strong></p>
      </div>
    </>);
}
export default OverviewTab;
