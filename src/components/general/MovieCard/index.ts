import MovieCard from "./MovieCard";
import MovieCardScore from "./MovieCardScore/MovieCardScore"
import MovieCardDelete from "./MovieCardDelete/MovieCardDelete"

export interface MovieCardProps {
    movieId: number,
    posterImageURL: string,
    title: string
}

export interface MovieCardScoreProps extends MovieCardProps {
    score: number
}

export interface MovieCardDeleteProps extends MovieCardProps {
    removeHandler: () => void
}

export { MovieCardScore, MovieCardDelete };

export default MovieCard;