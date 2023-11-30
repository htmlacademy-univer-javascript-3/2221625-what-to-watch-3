import ReviewComp from '../../review/review';
import { Review} from '../../../types/film';
function ReviewsTab({reviews}: { reviews: Review[] }): JSX.Element{
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <ReviewComp
            key={`review_${review.id}`}
            id={review.id}
            user={review.user}
            comment={review.comment}
            date={review.date}
            rating={review.rating}
          />
        ))}

      </div>
    </div>

  );
}
export default ReviewsTab;
