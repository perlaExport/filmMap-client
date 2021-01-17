import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";
import { ReactComponent as BrokenMovie } from "assets/images/broken-movie.svg";

const Error: React.FC = () => {
  return (
    <div className="error-page">
      <BrokenMovie className="broken-movie-icon" />
      <h2 className="error-message">NOT FOUND</h2>
      <Link to="/" className="link-element">
        Go back to home page
      </Link>
    </div>
  );
};

export default Error;
