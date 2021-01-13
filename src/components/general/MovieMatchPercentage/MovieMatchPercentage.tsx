import React from "react";
import { MovieMatchPercentageProps } from "./index";
import "./MovieMatchPercentage.scss";

const MovieMatchPercentage: React.FC<MovieMatchPercentageProps> = ({ percentage }) => {
  const percentageRateClass = (): string => {
    if (percentage < 40) {
      return "rating-bad";
    } else if (percentage < 70) {
      return "rating-average";
    } else {
      return "rating-good";
    }
  };
  return (
    <div
      className={`movie-match-percentage ${percentageRateClass()}`}>{`${percentage}% match`}</div>
  );
};

export default MovieMatchPercentage;
