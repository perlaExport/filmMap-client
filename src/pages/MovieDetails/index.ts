import { GenreProps } from "./MovieInfo/GenreList";

import PosterBackdrop from "./PosterBackdrop";
import UserMovieManager from "./UserMovieManager";
import MovieDetails from "./MovieDetails";
import Reviews from "./Reviews";
import MovieInfo from "./MovieInfo";
import Poster from "./Poster";

export interface MovieProps {
  id: number;
  posterPath?: string;
  backdropPath?: string;
  genres: GenreProps[];
  overview: string;
  title: string;
  runtime: number;
  imdbRating: number;
}
export type favAndWatchlaterType = { favourite: boolean; watchlater: boolean };

export { Poster, MovieInfo, PosterBackdrop, UserMovieManager, Reviews };

export default MovieDetails;
