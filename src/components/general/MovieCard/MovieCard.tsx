import React from 'react';
import "./MovieCard.scss";
import Image from "components/general/Image/Image";

interface MovieCardProps {
    posterImageURL?: string,
    title: string
}

const MovieCard: React.FC<MovieCardProps> = ({ posterImageURL, title }) => {
    return (
        <div className="movie-card">
            <div className="image-container">
                <Image className="poster-image" imageURL={!!posterImageURL ? posterImageURL : ""} />
                <div className="gradient"></div>
            </div>
            <h2 className="movie-title">{title}</h2>
        </div>
    )
}

export default MovieCard
