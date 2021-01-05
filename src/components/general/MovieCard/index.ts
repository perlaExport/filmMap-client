import MovieCard from "./MovieCard";
import MovieCardScore from "./MovieCardScore"

export interface MovieCardProps {
    movieId: number,
    posterImageURL: string,
    title: string
}

export { MovieCardScore };

export default MovieCard;