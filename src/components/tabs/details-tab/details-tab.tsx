type DetailsProps={
    director:string| undefined;
    starring:string| undefined;
    runtime:string| undefined;
    genre:string| undefined;
    date:string| undefined;
  }

function DetailTab({director,starring,runtime,genre,date}: DetailsProps): JSX.Element{
  const actorsArray = starring ? starring.split(', ') : [];

  const formattedActors = actorsArray.map((actor, index) => (
    <>
      {actor}{index !== actorsArray.length - 1 && ', '}
      {index !== actorsArray.length - 1 && <br />}
      {index !== actorsArray.length - 1 && ' '}
    </>));
  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {formattedActors}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{runtime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{date}</span>
        </p>
      </div>
    </div>);
}
export default DetailTab;
