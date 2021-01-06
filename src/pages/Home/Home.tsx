import React from "react";
import "./Home.scss";
import SearchMovieBar from "components/general/SearchMovieBar";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="search-bar-logo-wrapper">
        <Logo />
        <SearchMovieBar />
      </div>
    </div>
  );
};

export default Home;
