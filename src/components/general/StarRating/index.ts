import StarRating from "./StarRating";

export interface StarRatingProps {
  setScore: (score: number) => void;
  score: number;
  submitRating: (score: number) => void;
}

export default StarRating;
