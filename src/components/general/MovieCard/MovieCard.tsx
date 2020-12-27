import React from 'react';
import "./MovieCard.scss";
import Image from "components/general/Image/Image";
import { Link } from "react-router-dom";

interface MovieCardProps {
    movieId: number,
    posterImageURL: string,
    title: string
}

const MovieCard: React.FC<MovieCardProps> = ({ movieId, posterImageURL, title }) => {
    return (
        <Link className="movie-card" to={`/movie/${movieId}`} >
            <div className="image-container">
                <Image className="poster-image" imageURL={!!posterImageURL ? posterImageURL : ""} />
                <div className="gradient"></div>
            </div>
            <h2 className="movie-title">{title}</h2>
        </Link>
    )
}

export default MovieCard
