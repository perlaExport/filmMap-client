import React from "react";
import GenreList from "./GenreList";
import { MovieProps } from "../index";
import "./MovieInfo.scss";
import { ReactComponent as IMDBLogo } from "assets/images/imdb-logo.svg";
import { ReactComponent as Time } from "assets/images/clock-icon.svg";

interface MovieInfoProps {
  movieDetails: MovieProps;
  runtime: number;
  imdbRating: number;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieDetails, imdbRating, runtime }) => {
  const { title, genres, overview } = movieDetails;
  return (
    <div className="movie-info">
      <h1 className="movie-title">{title}</h1>
      <GenreList genres={genres} />
      <div className="ratings-container">
        <div className="run-time">
          <Time />
          {`${runtime} min`}
        </div>
        <span className="rating">
          <IMDBLogo />
          {`${imdbRating}/10`}
        </span>
      </div>
      <p className="movie-overview">{overview}</p>
    </div>
  );
};

export default MovieInfo;
