import React from "react";
import "./Home.scss";
import SearchMovieBar from "components/general/SearchMovieBar/SearchMovieBar";

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <SearchMovieBar />
        </div>
    )
}

export default Home
