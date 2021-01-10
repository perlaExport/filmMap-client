import React, { useState, useEffect } from "react";
import "./Questionnaire.scss";
import { MovieCardProps } from "components/general/MovieCard";
import callAPI, { callTMDBAPI } from "helper/api";
import LoadingWrapper from "components/layout/LoadingWrapper";
import NotFoundMovieMessage from "./NotFoundMovieMessage";
import RateMovie from "./RateMovie";

const Questionnaire: React.FC = () => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [movie, setMovie] = useState<MovieCardProps>({
    movieId: -1,
    title: "",
    posterImageURL: "",
  });
  const [isLoading, setLoading] = useState<boolean>(true);
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
      }
    } else {
      setMoviesInDB(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMovie();
    return () => {};
  }, []);

  return (
    <div className="questionnaire-page">
      <LoadingWrapper isLoading={isLoading} className="movie-container">
        {moviesInDB ? (
          <RateMovie movie={movie} nextMovie={getRandomMovie} />
        ) : (
          <NotFoundMovieMessage />
        )}
      </LoadingWrapper>
    </div>
  );
};

export default Questionnaire;
