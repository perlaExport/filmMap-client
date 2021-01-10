import React, { useState, useEffect } from "react";
import "./Questionnaire.scss";
import { MovieCardPoster, MovieCardProps } from "components/general/MovieCard";
import callAPI, { callTMDBAPI } from "helper/api";
import LoadingWrapper from "components/layout/LoadingWrapper";
import StarRating from "components/general/StarRating";
import { Link } from "react-router-dom";

const Questionnaire: React.FC = () => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [movie, setMovie] = useState<MovieCardProps>({
    movieId: -1,
    title: "",
    posterImageURL: "",
  });
  const [isLoading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(-1);
  const [moviesInDB, setMoviesInDB] = useState<boolean>(true);

  const getRandomMovie = async () => {
    const { data, status } = await callAPI({
      url: "/movie/random",
      method: "GET",
      token: true,
    });
    if (status === 200) {
      const { data: TMDBData, status: TMDBStatus } = await callTMDBAPI({
        url: `/movie/${data.movieId}`,
        method: "GET",
        setLoading,
      });
      if (TMDBStatus === 200) {
        setMovie({
          movieId: TMDBData.id,
          title: TMDBData.title,
          posterImageURL: `${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${TMDBData.poster_path}`,
        });
        setScore(-1);
      }
    } else {
      setMoviesInDB(false);
      setLoading(false);
    }
  };

  const rateMovie = async (sumittingScore: number) => {
    const { status } = await callAPI({
      url: `/movie/${movie.movieId}/rate`,
      method: "PUT",
      token: true,
      queryParams: {
        rate: sumittingScore,
      },
    });
    if (status === 200) getRandomMovie();
  };

  useEffect(() => {
    getRandomMovie();
    return () => {};
  }, []);
  return (
    <div className="questionnaire-page">
      <LoadingWrapper isLoading={isLoading} className="movie-container">
        {moviesInDB ? (
          <>
            <MovieCardPoster {...movie} />
            <StarRating setScore={setScore} score={score} submitRating={rateMovie} />
            <button onClick={getRandomMovie} className="btn-secondary next-movie-btn">
              Next movie
            </button>
          </>
        ) : (
          <div className="no-movies-message">
            <p className="message">There are no movies in databas that you haven't rated :C</p>
            <Link className="link-element" to="/">
              Try searching manualy
            </Link>
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Questionnaire;
