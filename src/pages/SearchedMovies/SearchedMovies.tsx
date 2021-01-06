import React, { useEffect, useState } from "react";
import "./SearchedMovies.scss";
import MovieCard, { MovieCardProps } from "components/general/MovieCard";
import callTMDBAPI from "helper/APICallTMDB";
import queryString from "query-string";
import { LoadingWrapper } from "components/layout";
import Pagination, { PageProps } from "components/general/Pagination";
import { MovieResponse, ResultInfo } from "./";

const SearchedMovies: React.FC = () => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [resultMovies, setResultMovies] = useState<MovieCardProps[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [reslutsInfo, setResultInfo] = useState<ResultInfo>({
    resCount: 0,
    searchedTitle: "None",
  });
  const [page, setPage] = useState<PageProps>({
    currentPage: 1,
    amountOfPages: 1,
  });

  useEffect(() => {
    const getMatchedMovies = async (query: string) => {
      const { data, error, status } = await callTMDBAPI({
        url: "/search/movie",
        method: "GET",
        queryParams: { query, page: page.currentPage },
        setLoading,
      });
      console.log(data, error, status);
      if (status === 200) {
        const { results, total_results, total_pages } = data;
        setResultMovies(
          results.map(({ id, title, poster_path }: MovieResponse) => ({
            movieId: id,
            title,
            posterImageURL: poster_path,
          }))
        );
        setResultInfo({ resCount: total_results, searchedTitle: query });
        setPage((pageState) => ({ ...pageState, amountOfPages: total_pages }));
      }
    };
    const queryparams = queryString.parse(window.location.search);
    getMatchedMovies((queryparams.title as string) || "");
    return () => {};
  }, [page.currentPage]);

  const handleChangePage = (newPage: number) => {
    setPage({ ...page, currentPage: newPage });
  };

  return (
    <div className="searched-movie-wrapper">
      <LoadingWrapper isLoading={isLoading} className="searched-movies-page">
        <h1 className="searched-movies-query-title">
          {"FOUND "}
          <span className="results">{reslutsInfo.resCount}</span>
          {" RESULTS FOR: "}
          <span className="searched-query">{`"${reslutsInfo.searchedTitle}"`}</span>
        </h1>
        <div className="movie-container">
          {resultMovies.map(({ movieId, title, posterImageURL }) => (
            <MovieCard
              key={movieId}
              movieId={movieId}
              posterImageURL={
                !!posterImageURL
                  ? `${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterImageURL}`
                  : ""
              }
              title={title}
            />
          ))}
        </div>
      </LoadingWrapper>
      <Pagination
        currentPage={page.currentPage}
        handleChange={handleChangePage}
        amountOfPages={page.amountOfPages}
      />
    </div>
  );
};

export default SearchedMovies;
