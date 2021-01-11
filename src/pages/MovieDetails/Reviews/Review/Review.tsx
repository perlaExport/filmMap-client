import React from "react";
import "./Review.scss";
import { ReviewProps } from "./";

const Review: React.FC<ReviewProps> = ({ name, comment, score }) => {
  return (
    <div className="review-card">
      <header>
        <span className="name">{`${name}:`}</span>
        <span className="score">{`${score}/5`}</span>
      </header>
      <div className="comment">{comment}</div>
    </div>
  );
};

export default Review;
