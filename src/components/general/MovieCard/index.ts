import MovieCard from "./MovieCard";
import MovieCardScore from "./MovieCardScore/MovieCardScore"

export interface MovieCardProps {
    movieId: number,
    posterImageURL: string,
    title: string
}
export interface MovieCardScoreProps extends MovieCardProps {
    score: number
}

export { MovieCardScore };

export default MovieCard;