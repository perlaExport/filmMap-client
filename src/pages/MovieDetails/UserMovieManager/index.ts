import UserMovieManager from "./UserMovieManager";
import { MovieProps } from "../";

export interface UserMovieManagerProps {
  setScore: (score: number) => void;
  score: number;
  movieDetails: MovieProps;
  isFavourite: boolean;
  isWatchLater: boolean;
  toggleAddToWatchLater: (shouldAdd: boolean) => void;
  toggleAddToFavourite: (shouldAdd: boolean) => void;
}

export default UserMovieManager;
