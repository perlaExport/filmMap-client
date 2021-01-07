import React from "react";
import { IconButton } from "components/general/Button";
import { ReactComponent as FavouriteIcon } from "assets/images/star-outline.svg";
import callAPI from "helper/api";

interface FavouriteButtonProops {
  isFavourite: boolean;
  toggleAddToFavourite: (toggleState: boolean) => void;
  movieId: number;
  actionMovieHandler: (action: (params?: any) => any, props?: any) => any;
}

const FavouriteButton: React.FC<FavouriteButtonProops> = ({
  isFavourite,
  toggleAddToFavourite,
  movieId,
  actionMovieHandler,
}) => {
  const addMovieToFavoriteList = async () => {
    return await callAPI({
      url: `movie/favourites/add/${movieId}`,
      method: "POST",
      token: true,
    });
  };
  const addMovieToFavoriteHandler = async () => {
    const { status } = await actionMovieHandler(addMovieToFavoriteList);
    if (status === 200) toggleAddToFavourite(true);
  };
  const removeMovieFromFavourites = async () => {
    const shouldRemoveFromFavourites = window.confirm(
      "Are you sure you want to remove this movie from favourites?"
    );
    if (shouldRemoveFromFavourites) {
      const { status } = await callAPI({
        url: `/movie/favourites/delete/${movieId}`,
        method: "DELETE",
        token: true,
      });
      if (status === 200) toggleAddToFavourite(false);
    }
  };

  return (
    <IconButton
      icon={<FavouriteIcon />}
      classes={isFavourite ? "" : "btn-secondary"}
      onClick={isFavourite ? removeMovieFromFavourites : addMovieToFavoriteHandler}>
      Favourite
    </IconButton>
  );
};

export default FavouriteButton;
