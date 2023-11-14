import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useState, ChangeEvent} from 'react';
import {PromoFilm} from '../../types/film'
import { store } from '../../store/index';
import { useEffect } from 'react';
import { addComment} from '../../store/film-api-actions';
import Header from '../../components/header/header';


function AddReview({ promoFilm }: { promoFilm: PromoFilm }):JSX.Element{
  const params = useParams();


  

  const [reviewText, setReviewText] = useState('Review text');
  const [reviewRating, setReviewRating] = useState(0);

  const handlePostClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if(params.id)
      store.dispatch(addComment({ id: params.id, comment: reviewText, rating:reviewRating }));
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewRating(Number(event.target.value));
  };

  return(
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__poster film-card__poster--small">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} width="218" height="327" />

        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, index) => {
              const ratingValue = index + 1;
              return (
                <>
                  <input
                    className="rating__input"
                    id={`star-${ratingValue}`}
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    checked={reviewRating === ratingValue} 
                    onChange={handleRatingChange} 
                  />
                  <label className="rating__label" htmlFor={`star-${ratingValue}`}>
                    {`Rating ${ratingValue}`}
                  </label>
                </>
              );
            })}
          </div>
          
        </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              value={reviewText}
              onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
                setReviewText(target.value);
              }}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" onClick={handlePostClick}>Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );

}
export default AddReview;
