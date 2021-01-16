import Favourites from "./Favourites";
import WatchLater from "./WatchLater";
import MyRatings from "./MyRatings";

export type movieResponseType = {
  id: number;
  title: string;
  imgPath?: string;
  userRate?: number;
};

export { Favourites, WatchLater, MyRatings };
