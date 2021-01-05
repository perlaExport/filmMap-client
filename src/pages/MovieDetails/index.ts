import GenreList from "./GenreList/GenreList";
import PosterBackdrop from "./PosterBackdrop/PosterBackdrop";
import UserMovieManager from "./UserMovieManager/UserMovieManager";
import MovieDetails from "./MovieDetails";

export interface GenreProps {
    id: number,
    name: string
}

export interface MovieProps {
    id: number,
    posterPath?: string,
    backdropPath?: string,
    genres: GenreProps[],
    overview: string,
    title: string
}

export interface PosterBackdropProps {
    backdropImageLink: string,
    posterImageLink: string
}

export interface UserMovieManagerProps {
    setScore: (score: number) => void,
    score: number,
    movieDetails: MovieProps
}

export { GenreList, PosterBackdrop, UserMovieManager };

export default MovieDetails;