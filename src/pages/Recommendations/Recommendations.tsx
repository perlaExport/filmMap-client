import React, { useState, useEffect } from "react";
import "./Recommendations.scss";
import MovieCard, { MovieCardProps } from "components/general/MovieCard";
import LoadingWrapper from "components/layout/LoadingWrapper";
import callAPI from "helper/api";

const Recommendations: React.FC = () => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMyRatedMovies = async () => {
      const { data, status, error } = await callAPI({
        url: "/movie/recommendation",
        method: "GET",
        token: true,
        setLoading,
      });
      console.log(data, status, error);
      if (status === 200) {
        setMovies(
          data.map(({ id, title, imgPath }: { id: number; title: string; imgPath?: string }) => ({
            movieId: id,
            title,
            posterImageURL: imgPath,
          }))
        );
      }
    };
    getMyRatedMovies();
    return () => {};
  }, []);
  return (
    <LoadingWrapper isLoading={isLoading} className="recommended-movies">
      <h2 className="page-title">
        <span className="top">Top 5 movies</span>recommended for you
      </h2>
      {movies.map(({ movieId, title, posterImageURL }) => (
        <MovieCard
          classes="top-movie"
          key={movieId}
          movieId={movieId}
          title={title}
          posterImageURL={
            !!posterImageURL ? `${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterImageURL}` : ""
          }
        />
      ))}
    </LoadingWrapper>
  );
};

export default Recommendations;
