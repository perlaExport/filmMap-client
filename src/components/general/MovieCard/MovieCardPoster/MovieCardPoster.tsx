import React from "react";
import Image from "components/general/Image";
import { MovieCardProps } from "../";
import "./MovieCardPoster.scss";

const MovieCardPoster: React.FC<MovieCardProps> = ({ movieId, posterImageURL, title }) => {
  return (
    <div className="movie-card-poster">
      <Image className="poster-image" src={!!posterImageURL ? posterImageURL : ""} />
      <div className="title-wrapper">
        <h2 className="movie-title">{title}</h2>
      </div>
    </div>
  );
};

export default MovieCardPoster;
