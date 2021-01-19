import React from "react";
import Image from "components/general/Image";
import { PosterProps } from "./";

const Poster: React.FC<PosterProps> = ({ posterPath }) => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;
  return (
    <Image src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterPath}`} className="movie-poster" />
  );
};

export default Poster;
