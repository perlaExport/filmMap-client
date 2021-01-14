import React, { useContext } from "react";
import "./Home.scss";
import { UserContext } from "context/UserContext";
import SearchMovieBar from "components/general/SearchMovieBar";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { Link } from "react-router-dom";
import { IconButton } from "components/general/Button";
import { ReactComponent as FilmIcon } from "assets/images/movie-icon.svg";

const Home: React.FC = () => {
  const [{ authStatus }] = useContext(UserContext);
  return (
    <div className="home-page">
      <div className="search-bar-logo-wrapper">
        <Logo />
        <SearchMovieBar />
        {authStatus === "success" && (
          <>
            <Link to="/questionnaire" className="link-element ranomd-movie-link">
              Rate random movies
            </Link>
            <Link to="/recommendations" className="recommendation-link">
              <IconButton classes="recommendation-btn" icon={<FilmIcon />}>
                Get recommendations
              </IconButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
