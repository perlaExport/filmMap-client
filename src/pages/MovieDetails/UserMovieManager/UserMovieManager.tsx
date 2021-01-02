import React from 'react';
import StarRating from "components/general/StarRating/StarRating";
import { IconButton } from "components/general/Button"
import {ReactComponent as FavouriteIcon } from "assets/images/star-outline.svg";
import {ReactComponent as WatchLaterIcon } from "assets/images/clock-icon.svg";

interface StarRatingProps {
    setScore: (score: number) => void,
    score: number
}

const UserMovieManager: React.FC<StarRatingProps> = ({ setScore, score }) => {
    return (
        <div className="user-movie-manager">
            <StarRating 
                setScore={setScore}
                score={score}
                submitRating={(score) =>  {
                    console.log(`scored: ${score}`)
                }}
            />
            {
            score > -1
                ?
                <div className="score-option-container">
                    <button onClick={() => setScore(-1)} className="link-element">remove rating</button>
                    <IconButton icon={<FavouriteIcon />}>Favourite</IconButton>
                </div>
                :
                <div className="score-option-container">
                    <IconButton icon={<WatchLaterIcon />}>Watch Later</IconButton>
                </div>
            }
        </div>
    )
}

export default UserMovieManager
