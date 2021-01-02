import React, { useState } from 'react'
import "./StarRating.scss";
import { ReactComponent as Star } from "assets/images/star-outline.svg";

interface StarRatingProps {
    setScore: (score: number) => void,
    score: number,
    submitRating: (score: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ setScore, score, submitRating }) => {

    const [hoverScore, setHoverScore] = useState<number>(-1);

    const shouldFill = (index: number) => {
        if (hoverScore >= index) return "filled";
        else if (score >= index) return "filled";
        return "";
    }

    const hoverStar = (starIndex: number) => {
        if(score < starIndex) setHoverScore(starIndex);
    }
    const clearStar = () => {
        setHoverScore(-1);
    }

    const clickStarHandler = (starIndex: number) => {
        setScore(starIndex);
        submitRating(starIndex + 1);
    }


    return (
        <div className="star-rating-container">
            { [...Array(5)].map((_, i) => (
                <span
                    key={i}
                    onMouseLeave={clearStar}
                    onMouseEnter={() => hoverStar(i)}
                    onClick={() => clickStarHandler(i)}
                    className="star"
                >
                    <Star className={shouldFill(i)}/>
                 </span>
            ))}
        </div>
    )
}

export default StarRating
