import React, { useState } from "react";
import { MovieCardPoster, MovieCardProps } from "components/general/MovieCard";
import StarRating from "components/general/StarRating";
import callAPI from "helper/api";

interface RateMoviePorps {
  nextMovie: () => void;
  movie: MovieCardProps;
}

const RateMovie: React.FC<RateMoviePorps> = ({ nextMovie, movie }) => {
  const [score, setScore] = useState<number>(-1);

  const rateMovie = async (sumittingScore: number) => {
    const { status } = await callAPI({
      url: `/movie/${movie.movieId}/rate`,
      method: "PUT",
      token: true,
      queryParams: {
        rate: sumittingScore,
      },
    });
    if (status === 200) nextMovie();
  };

  const handleNextMovie = () => {
    nextMovie();
    setScore(-1);
  };

  return (
    <div className="rate-moovie-container">
      <MovieCardPoster {...movie} />
      <StarRating setScore={setScore} score={score} submitRating={rateMovie} />
      <button onClick={handleNextMovie} className="btn-secondary next-movie-btn">
        Next movie
      </button>
    </div>
  );
};

export default RateMovie;
