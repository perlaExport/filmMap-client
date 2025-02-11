import React, { useState, useEffect } from "react";
import { MovieCardDeleteProps, MovieCardDelete } from "components/general/MovieCard";
import Pagination, { PageProps } from "components/general/Pagination";
import LoadingWrapper from "components/layout/LoadingWrapper";
import callAPI from "helper/api";
import { MovieResponseType } from "./";

const Favourites: React.FC = () => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [page, setPage] = useState<PageProps>({
    currentPage: 1,
    amountOfPages: 1,
  });
  const [movies, setMovies] = useState<MovieCardDeleteProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMyRatedMovies = async () => {
      const { data, status } = await callAPI({
        url: "/movie/favourites",
        method: "GET",
        token: true,
        setLoading,
        queryParams: {
          limit: 8,
          page: page.currentPage - 1,
        },
      });
      if (status === 200) {
        setMovies(
          data.movies.map((movie: MovieResponseType) => ({
            movieId: movie.id,
            title: movie.title,
            posterImageURL: movie.imgPath,
          }))
        );
        setPage((page) => ({ ...page, amountOfPages: data.amountOfPages }));
      }
    };
    getMyRatedMovies();
    return () => {};
  }, [page.currentPage]);

  const handleChangePage = (newPage: number) => {
    setPage({ ...page, currentPage: newPage });
  };

  const handleRemoveFromFavouriteList = async (movieIdToBeDeleted: number) => {
    const shouldRemoveMovie = window.confirm(
      "Are you sure you want to remove this movie from favourites?"
    );
    if (shouldRemoveMovie) {
      const { status } = await callAPI({
        url: `/movie/favourites/delete/${movieIdToBeDeleted}`,
        method: "DELETE",
        token: true,
      });
      if (status === 200)
        setMovies((movies) => movies.filter(({ movieId }) => movieId !== movieIdToBeDeleted));
    }
  };

  return (
    <div className="favourites-subpage-container movie-list-container">
      <LoadingWrapper isLoading={isLoading} className="movies">
        {movies.map(({ movieId, title, posterImageURL }) => (
          <MovieCardDelete
            key={movieId}
            movieId={movieId}
            title={title}
            posterImageURL={
              !!posterImageURL ? `${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterImageURL}` : ""
            }
            removeHandler={() => handleRemoveFromFavouriteList(movieId)}
          />
        ))}
        {movies.length < 1 && (
          <div className="empty-list-message">You have no favourite movies</div>
        )}
      </LoadingWrapper>
      <Pagination
        currentPage={page.currentPage}
        handleChange={handleChangePage}
        amountOfPages={page.amountOfPages}
      />
    </div>
  );
};

export default Favourites;
