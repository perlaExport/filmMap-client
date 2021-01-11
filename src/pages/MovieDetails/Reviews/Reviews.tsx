import React, { useState, useEffect } from "react";
import Review from "./Review";
import { ReviewsProps } from "./";
import callAPI from "helper/api";
import "./Reviews.scss";

export interface ReviewRespoonse {
  user: {
    id: number;
    name: string;
  };
  comment: string;
  score: number;
}

const Reviews: React.FC<ReviewsProps> = ({ userReview, movieId }) => {
  const [comment, setComment] = useState<string>(userReview || "");
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

  const commentOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const submitReview = async () => {
    const { data, status, error } = await callAPI({
      url: `/movie/${movieId}/review`,
      method: "PUT",
      token: true,
      payload: {
        review: comment,
      },
    });
    console.log(data, status, error);
  };
  return (
    <section className="movie-reviews">
      <div className="review-input">
        <button className="link-element">Remove review</button>
        <button onClick={submitReview} className="btn-primary">
          Submit
        </button>
        {/* <textarea name="" id=""></textarea> */}
        <input value={comment} type="text" onChange={commentOnChangeHandler} />
      </div>
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
