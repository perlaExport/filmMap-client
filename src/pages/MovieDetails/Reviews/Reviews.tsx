import React, { useState, useEffect } from "react";
import Review from "./Review";
import { ReviewsProps } from "./";
import callAPI from "helper/api";
import "./Reviews.scss";
import CommentInput from "./CommentInput";

export interface ReviewRespoonse {
  user: {
    id: number;
    name: string;
  };
  comment: string;
  score: number;
}

const Reviews: React.FC<ReviewsProps> = ({ userReview, movieId }) => {
  const [reviews, setReviews] = useState<ReviewRespoonse[]>([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      const { data, status, error } = await callAPI({
        url: `/movie/${movieId}/reviews?limit=8&page=0`,
        method: "GET",
        token: true,
      });
      if (status === 200) {
        setReviews(
          data.reviews.map((review: any) => ({
            user: {
              name: review.user.name,
              id: review.user.id,
            },
            comment: review.userReview,
            score: review.userRate,
          }))
        );
      }
      console.log(data, status, error);
    };
    getMovieReviews();
    return () => {};
  }, [movieId]);

  return (
    <section className="movie-reviews">
      <CommentInput userReview={userReview} movieId={movieId} />
      <div className="review-container">
        {reviews.map((review) => (
          <Review
            key={review.user.id}
            name={review.user.name}
            score={review.score}
            comment={review.comment}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
