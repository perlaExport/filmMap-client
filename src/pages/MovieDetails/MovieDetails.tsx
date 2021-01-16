import React, { useEffect, useState, useContext } from "react";
import "./MovieDetails.scss";
import { RouteComponentProps } from "react-router-dom";
import { UserContext } from "context/UserContext";
import callAPI, { callTMDBAPI } from "helper/api";
import LoadingWrapper from "components/layout/LoadingWrapper";
import {
  MovieInfo,
  PosterBackdrop,
  Poster,
  UserMovieManager,
  MovieProps,
  favAndWatchlaterType,
  Reviews,
} from "./";

const MovieDetails: React.FC<RouteComponentProps<{ movieId?: string | undefined }>> = (props) => {
  const [{ authStatus }] = useContext(UserContext);

  const [movieDetails, setMoviedetails] = useState<MovieProps>({
    id: 0,
    posterPath: "",
    backdropPath: "",
    genres: [],
    overview: "",
    title: "",
    runtime: 0,
    imdbRating: 0,
  });

  const [isFavandWatchLater, setIsFavAndWatchLater] = useState<favAndWatchlaterType>({
    favourite: false,
    watchlater: false,
  });

  const [score, setScore] = useState<number>(-1);

  const [userReview, setUserReview] = useState<string>("");

  useEffect(() => {
    const { movieId } = props.match.params;
    const getMovieDetailsBydId = async () => {
      const { data, status } = await callTMDBAPI({
        url: `/movie/${movieId}`,
        method: "GET",
      });
      if (status === 200) {
        setMoviedetails({
          id: data.id,
          posterPath: data.poster_path,
          backdropPath: data.backdrop_path,
          genres: data.genres,
          overview: data.overview,
          title: data.title,
          runtime: data.runtime,
          imdbRating: data.vote_average,
        });
      }
    };
    const getMovieRating = async () => {
      const { data, status } = await callAPI({
        url: `/movie/${movieId}`,
        method: "GET",
        token: true,
      });
      if (status === 200) {
        setIsFavAndWatchLater({
          favourite: data.favourite,
          watchlater: data.watchLater,
        });
        setUserReview(data.userReview || "");
        setScore(data.userRate - 1);
      }
    };
    if (!!movieId && authStatus !== null) {
      getMovieDetailsBydId();
      if (authStatus === "success") getMovieRating();
    }

    return () => {};
  }, [props.match.params, authStatus]);

  const toggleMovieToFavourite = (shouldAdd: boolean) => {
    setIsFavAndWatchLater((state) => ({ ...state, favourite: shouldAdd }));
  };
  const toggleMovieToWatchLater = (shouldAdd: boolean) => {
    setIsFavAndWatchLater((state) => ({ ...state, watchlater: shouldAdd }));
  };

  return (
    <LoadingWrapper className="movie-details-page" isLoading={movieDetails.title === ""}>
      {movieDetails.backdropPath !== "" && (
        <PosterBackdrop
          posterPath={movieDetails.posterPath || ""}
          backdropPath={movieDetails.backdropPath || ""}
        />
      )}
      <section className="main-movie-details">
        <div className="poster-wrapper">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <Poster
            movieId={movieDetails.id}
            shouldDisplayMatch={authStatus === "success" && score < 1}
            posterPath={movieDetails.posterPath || ""}
          />
          {authStatus === "success" && (
            <UserMovieManager
              movieDetails={movieDetails}
              isFavourite={isFavandWatchLater.favourite}
              isWatchLater={isFavandWatchLater.watchlater}
              toggleAddToWatchLater={toggleMovieToWatchLater}
              toggleAddToFavourite={toggleMovieToFavourite}
              setScore={setScore}
              score={score}
            />
          )}
        </div>
        <MovieInfo
          movieDetails={movieDetails}
          runtime={movieDetails.runtime}
          imdbRating={movieDetails.imdbRating}
        />
      </section>
      <Reviews score={score} movieId={movieDetails.id} userReview={userReview} />
    </LoadingWrapper>
  );
};

export default MovieDetails;
