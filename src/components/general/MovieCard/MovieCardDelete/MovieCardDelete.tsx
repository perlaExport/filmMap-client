import React from "react";
import Moviecard, { MovieCardDeleteProps } from "../";
import "./MovieCardDelete.scss";

const MovieCardDelete: React.FC<MovieCardDeleteProps> = (props) => {
  return (
    <div className="remove-movie-card-wrapper">
      <button onClick={props.removeHandler} className="remove">
        Remove
      </button>
      <Moviecard {...props} />
    </div>
  );
};

export default MovieCardDelete;
