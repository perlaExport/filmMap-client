import Favourites from "./Favourites";
import WatchLater from "./WatchLater";
import MyRatings from "./MyRatings";

export type RatedMovieResponseType = {
  movie: {
    id: number;
    title: string;
    imgPath?: string;
  };
  userRate?: number;
};

export type MovieResponseType = {
  id: number;
  title: string;
  imgPath?: string;
};

export { Favourites, WatchLater, MyRatings };
