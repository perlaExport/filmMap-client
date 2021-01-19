import React from "react";
import "./MovieCard.scss";
import Image from "components/general/Image";
import { Link } from "react-router-dom";
import { MovieCardProps } from "./";

const MovieCard: React.FC<MovieCardProps> = ({ movieId, posterImageURL, title, classes }) => {
  return (
    <Link className={`movie-card ${classes || ""}`} to={`/movie/${movieId}`}>
      <div className="image-container">
        <Image className="poster-image" src={!!posterImageURL ? posterImageURL : ""} />
        <div className="gradient"></div>
      </div>
      <h2 className="movie-title">{title}</h2>
    </Link>
  );
};

export default MovieCard;
