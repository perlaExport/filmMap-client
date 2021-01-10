import React from "react";
import { Link } from "react-router-dom";

const NotFoundMovieMessage: React.FC = () => {
  return (
    <div className="no-movies-message">
      <p className="message">There are no movies in databas that you haven't rated :C</p>
      <Link className="link-element" to="/">
        Try searching manualy
      </Link>
    </div>
  );
};

export default NotFoundMovieMessage;
