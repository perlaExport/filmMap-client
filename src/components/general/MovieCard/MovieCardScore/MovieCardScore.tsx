import React from 'react';
import Moviecard, { MovieCardScoreProps } from "../";
import "./MovieCardScore.scss";
import { ReactComponent as Star } from "assets/images/star-outline.svg"

const MovieCardScore: React.FC<MovieCardScoreProps> = (props) => {
    return (
        <div className="scored-movie-card-wrapper">
            <span className="score"><Star />{props.score}</span>
            <Moviecard {...props} />
        </div>
    )
}

export default MovieCardScore
