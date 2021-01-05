import React from 'react';
import "./GenreList.scss"
import { GenreProps } from "../";


const GenreList: React.FC<{ genres: GenreProps[] }> = ({ genres }) => {
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
