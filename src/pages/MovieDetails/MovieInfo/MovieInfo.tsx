import React from "react";
import GenreList from "./GenreList";
import { MovieProps } from "../index";
import "./MovieInfo.scss";

interface MovieInfoProps {
  movieDetails: MovieProps;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieDetails }) => {
  const { title, genres, overview } = movieDetails;
  return (
    <div className="movie-info">
      <h1 className="movie-title">{title}</h1>
      <GenreList genres={genres} />
      <p className="movie-overview">{overview}</p>
    </div>
  );
};

export default MovieInfo;
