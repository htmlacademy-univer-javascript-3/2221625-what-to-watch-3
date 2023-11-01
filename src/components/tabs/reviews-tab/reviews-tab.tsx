import Review from '../../review/review';
type ReviewsProps={
    text:string;
    author:string;
    date:string;
    rating:string;
  }
function ReviewsTab({reviews}: { reviews: ReviewsProps[] }): JSX.Element{
  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <Review
            key={`review_${review.author}_${review.date}`}
            text={review.text}
            author={review.author}
            date={review.date}
            rating={review.rating}
          />
        ))}

      </div>
    </div>

  );
}
export default ReviewsTab;
