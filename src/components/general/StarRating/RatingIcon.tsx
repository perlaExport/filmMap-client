import React, { useMemo } from 'react';
import { ReactComponent as Star } from "assets/images/star-outline.svg";

interface RatingIconProps {
    index: number,
    rating: number,
    hoverRating: number,
    onMouseEnter: (index: number) => void,
    onMouseLeave: () => void,
    onSaveRating: (index: number) => void
}


const RatingIcon: React.FC<RatingIconProps> = ({ index, rating, hoverRating, onMouseEnter, onMouseLeave, onSaveRating }) => {

    const fill = useMemo(() => {
        if (hoverRating >= index) {
          return "filled";
        } else if (!hoverRating && rating >= index) {
          return "filled";
        }
        return "";
      }, [rating, hoverRating, index]);

    return (
        <Star
            onMouseEnter={() => onMouseEnter(index)} 
            onMouseLeave={() => onMouseLeave()} 
            onClick={() => onSaveRating(index)}
            className={`star ${fill}`}
     />
    )
}

export default RatingIcon
