import GenreList, { GenreProps } from "./GenreList";
import PosterBackdrop from "./PosterBackdrop";
import UserMovieManager from "./UserMovieManager";
import MovieDetails from "./MovieDetails";
import Reviews from "./Reviews";

export interface MovieProps {
  id: number;
  posterPath?: string;
  backdropPath?: string;
  genres: GenreProps[];
  overview: string;
  title: string;
}
export type favAndWatchlaterType = { favourite: boolean; watchlater: boolean };

export { GenreList, PosterBackdrop, UserMovieManager, Reviews };

export default MovieDetails;
