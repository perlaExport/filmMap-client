import React from "react";
import "./Poster.scss";
import Image from "components/general/Image";
import { PosterProps } from "./";
import MovieMatchPercentage from "components/general/MovieMatchPercentage";

const Poster: React.FC<PosterProps> = ({ posterPath }) => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  return (
    <div className="poster-wrapper">
      <MovieMatchPercentage percentage={75} />
      <Image src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterPath}`} className="movie-poster" />
    </div>
  );
};

export default Poster;
