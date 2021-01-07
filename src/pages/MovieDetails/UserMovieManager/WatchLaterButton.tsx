import React from "react";
import { IconButton } from "components/general/Button";
import { ReactComponent as WatchLaterIcon } from "assets/images/clock-icon.svg";
import callAPI from "helper/api";

interface WatchLaterButtonProops {
  isWatchLater: boolean;
  toggleAddToWatchLater: (toggleState: boolean) => void;
  movieId: number;
  actionMovieHandler: (action: (params?: any) => any, props?: any) => any;
}

const WatchLaterButton: React.FC<WatchLaterButtonProops> = ({
  isWatchLater,
  toggleAddToWatchLater,
  movieId,
  actionMovieHandler,
}) => {
  const addMovieToWatchLaterList = async () => {
    return await callAPI({
      url: `movie/watch_later/add/${movieId}`,
      method: "POST",
      token: true,
    });
  };
  const addMovieToWatchLaterHandler = async () => {
    const { status } = await actionMovieHandler(addMovieToWatchLaterList);
    if (status === 200) toggleAddToWatchLater(true);
  };
  const removeMovieFromWatchLater = async () => {
    const shouldRemoveFromFavourites = window.confirm(
      "Are you sure you want to remove this movie from watch later?"
    );
    if (shouldRemoveFromFavourites) {
      const { status } = await callAPI({
        url: `/movie/watch_later/delete/${movieId}`,
        method: "DELETE",
        token: true,
      });
      if (status === 200) toggleAddToWatchLater(false);
    }
  };

  return (
    <IconButton
      icon={<WatchLaterIcon />}
      classes={isWatchLater ? "" : "btn-secondary"}
      onClick={isWatchLater ? removeMovieFromWatchLater : addMovieToWatchLaterHandler}>
      Watch Later
    </IconButton>
  );
};

export default WatchLaterButton;
