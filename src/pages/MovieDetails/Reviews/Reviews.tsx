import React, { useState, useEffect } from "react";
import Review from "./Review";
import { ReviewsProps } from "./";
import callAPI from "helper/api";
import "./Reviews.scss";
import CommentInput from "./CommentInput";
import Pagination, { PageProps } from "components/general/Pagination";

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
  const [page, setPage] = useState<PageProps>({ currentPage: 1, amountOfPages: 1 });

  useEffect(() => {
    const getMovieReviews = async () => {
      const { data, status, error } = await callAPI({
        url: `/movie/${movieId}/reviews?limit=3&page=${page.currentPage - 1}`,
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
        setPage((page) => ({ ...page, amountOfPages: data.amountOfPages }));
      }
      console.log(data, status, error);
    };
    getMovieReviews();
    return () => {};
  }, [movieId, page.currentPage]);

  const handleChangePage = (newPage: number) => {
    setPage({ ...page, currentPage: newPage });
  };

  return (
    <section className="movie-reviews">
      <h2>Reviews</h2>
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
      <Pagination
        currentPage={page.currentPage}
        handleChange={handleChangePage}
        amountOfPages={page.amountOfPages}
      />
    </section>
  );
};

export default Reviews;
