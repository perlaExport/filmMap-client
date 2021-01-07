import Favourites from "./Favourites";
import WatchLater from "./WatchLater";
import MyRatings from "./MyRatings";

export type movieResponseType = {
  id: number;
  title: string;
  imgPath?: string;
  rating?: number;
};

export { Favourites, WatchLater, MyRatings };
