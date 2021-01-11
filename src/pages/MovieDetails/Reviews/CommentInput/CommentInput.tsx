import React, { useState } from "react";
import "./CommentInput.scss";
import callAPI from "helper/api";

interface CommentInputPorps {
  movieId: number;
  userReview: string;
}

const CommentInput: React.FC<CommentInputPorps> = ({ movieId, userReview }) => {
  const [comment, setComment] = useState<string>(userReview);

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

  const removeReview = async () => {
    const shouldRemooveReview = window.confirm("Are you sure you want to remove your review?");
    if (shouldRemooveReview) {
      const { data, status, error } = await callAPI({
        url: `/movie/${movieId}/delete_review`,
        method: "DELETE",
        token: true,
        payload: {
          review: comment,
        },
      });
      console.log(data, status, error);
    }
  };
  const commentOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <div className="review-input">
      <div className="button-group">
        <button onClick={removeReview} className="link-element remove-review">
          Remove review
        </button>
        <button onClick={submitReview} className="btn-primary submit-btn">
          Submit
        </button>
      </div>

      {/* <textarea name="" id=""></textarea> */}
      <input
        className="comment-input"
        value={comment}
        type="text"
        onChange={commentOnChangeHandler}
      />
    </div>
  );
};

export default CommentInput;
