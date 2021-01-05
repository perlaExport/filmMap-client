import React from 'react';
import Moviecard, { MovieCardProps } from "./"

interface MovieCardScoreProps extends MovieCardProps {
    score: number
}

const MovieCardScore: React.FC<MovieCardScoreProps> = (props) => {
    return (
        <div className="scored">
            <Moviecard {...props} />
        </div>
    )
}

export default MovieCardScore
