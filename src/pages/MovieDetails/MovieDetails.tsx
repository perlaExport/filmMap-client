import React, { useEffect, useState, useContext } from "react";
import "./MovieDetails.scss";
import { RouteComponentProps } from "react-router-dom";
import { UserContext } from "context/UserContext";
import callAPI, { callTMDBAPI } from "helper/api";
import Image from "components/general/Image";
import LoadingWrapper from "components/layout/LoadingWrapper";
import {
  MovieInfo,
  PosterBackdrop,
  UserMovieManager,
  MovieProps,
  favAndWatchlaterType,
  Reviews,
} from "./";

const MovieDetails: React.FC<RouteComponentProps<{ movieId?: string | undefined }>> = (props) => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

  const [{ authStatus }] = useContext(UserContext);

  const [movieDetails, setMoviedetails] = useState<MovieProps>({
    id: 0,
    posterPath: "",
    backdropPath: "",
    genres: [],
    overview: "",
    title: "",
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
        const { id, poster_path, backdrop_path, genres, overview, title } = data;
        setMoviedetails({
          id,
          posterPath: poster_path,
          backdropPath: backdrop_path,
          genres,
          overview,
          title,
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
    if (!!movieId && (authStatus === "failed" || authStatus === "success")) {
      getMovieDetailsBydId();
      getMovieRating();
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
          posterImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.posterPath}`}
          backdropImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.backdropPath}`}
        />
      )}
      <section className="main-movie-details">
        <div className="poster-wrapper">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <Image
            src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${movieDetails.posterPath}`}
            className="movie-poster"
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
        <MovieInfo movieDetails={movieDetails} />
      </section>
      <Reviews score={score} movieId={movieDetails.id} userReview={userReview} />
    </LoadingWrapper>
  );
};

export default MovieDetails;
