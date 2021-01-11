import React from "react";
import StarRating from "components/general/StarRating";
import { UserMovieManagerProps } from "./";
import callAPI from "helper/api";
import WatchLaterButton from "./WatchLaterButton";
import FavouriteButton from "./FavouriteButton";

const UserMovieManager: React.FC<UserMovieManagerProps> = ({
  setScore,
  score,
  movieDetails,
  isFavourite,
  isWatchLater,
  toggleAddToFavourite,
  toggleAddToWatchLater,
}) => {
  const rateMovie = async (movieScore: number) => {
    return await callAPI({
      url: `/movie/${movieDetails.id}/rate`,
      method: "PUT",
      token: true,
      queryParams: {
        rate: movieScore,
      },
    });
  };

  const addMovieToDataBase = async () => {
    return await callAPI({
      url: "movie/add",
      method: "POST",
      token: true,
      payload: {
        id: movieDetails.id,
        title: movieDetails.title,
        categories: movieDetails.genres.map(({ name }) => name),
        imgPath: movieDetails.posterPath || "",
      },
    });
  };

  const actionMovieHandler = async (action: (params?: any) => any, props?: any) => {
    const { status: rateStatus } = await action(props);
    if (rateStatus === 404) {
      const { status: addedMovieStatus } = await addMovieToDataBase();
      if (addedMovieStatus === 200) {
        return await action(props);
      }
    }
    return { error: "not found", status: rateStatus };
  };

  const rateMovieHandler = async (score: number) => {
    await actionMovieHandler(rateMovie, score);
  };

  const removeMovieRating = async () => {
    const shouldRemove = window.confirm("Are you sure you want to remove your rating?");
    if (shouldRemove) {
      const { status } = await callAPI({
        url: `/movie/${movieDetails.id}/delete_rate`,
        method: "DELETE",
        token: true,
      });
      if (status === 200) setScore(-1);
    }
  };

  return (
    <div className="user-movie-manager">
      <StarRating
        setScore={setScore}
        score={score}
        submitRating={(movieScore) => rateMovieHandler(movieScore)}
      />
      {score > -1 ? (
        <div className="score-option-container">
          <button onClick={removeMovieRating} className="link-element">
            remove rating
          </button>
          <FavouriteButton
            actionMovieHandler={actionMovieHandler}
            movieId={movieDetails.id}
            isFavourite={isFavourite}
            toggleAddToFavourite={toggleAddToFavourite}
          />
        </div>
      ) : (
        <div className="score-option-container">
          <WatchLaterButton
            actionMovieHandler={actionMovieHandler}
            movieId={movieDetails.id}
            isWatchLater={isWatchLater}
            toggleAddToWatchLater={toggleAddToWatchLater}
          />
        </div>
      )}
    </div>
  );
};

export default UserMovieManager;
