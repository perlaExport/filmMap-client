import React from 'react';
import "./GenreList.scss"

interface Genre {
    id: number,
    name: string
}

interface GenreListProps {
    genres: Genre[]
}

const GenreList: React.FC<GenreListProps> = ({ genres }) => {
    return (
        <div className="genre-list-container">
            <h3 className="genre-title">Genres:</h3>
            { genres.map(({id, name}) => (
                <div className="genre-item" key={id}>{name}</div>
            ))}
        </div>
    )
}

export default GenreList
