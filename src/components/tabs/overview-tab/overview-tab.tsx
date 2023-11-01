
type OverviewProps={
    score:string | undefined;
    ratingCount:string| undefined ;
    description:string | undefined;
    director:string | undefined;
    starring:string | undefined;
  }
function OverviewTab({score,ratingCount,description,director,starring}: OverviewProps): JSX.Element{
  const scoreNumber = score ? parseFloat(score.replace(',', '.')) : 0;
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

  const actorsArray = starring ? starring.split(', ') : [];

  let formattedStarring;
  if (actorsArray.length > 4) {
    const firstFourActors = actorsArray.slice(0, 4);
    formattedStarring = (
      <>
        {firstFourActors.join(', ')}
        {' and other'}
      </>
    );
  } else {
    formattedStarring = actorsArray.join(', ');
  }

  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingText(scoreNumber)}</span>
          <span className="film-rating__count">{ratingCount}</span>
        </p>
      </div>

      <div className="film-card__text" >
        <div dangerouslySetInnerHTML={{__html:description || ''}}></div>
        <p className="film-card__director"><strong>Director:{director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {formattedStarring}</strong></p>
      </div>
    </>);
}
export default OverviewTab;
