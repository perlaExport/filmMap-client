import React, { useState, useEffect } from "react";
import "./PosterWrapper.scss";
import Poster from "components/general/Poster";
import { PosterWrapperProps } from ".";
import MovieMatchPercentage from "components/general/MovieMatchPercentage";
import callAPI from "helper/api";

const PosterWrapper: React.FC<PosterWrapperProps> = ({
  posterPath,
  movieId,
  shouldDisplayMatch,
}) => {
  const [matchPercentage, setMatchPercentage] = useState<number>(-1);

  useEffect(() => {
    const getUserMattchPercentage = async () => {
      const { data, status, error } = await callAPI({
        url: `/movie/${movieId}/recommendation`,
        method: "GET",
        token: true,
      });
      console.log(data, status, error);
      if (status === 200) setMatchPercentage(data);
    };
    if (shouldDisplayMatch) getUserMattchPercentage();
    return () => {};
  }, [movieId, shouldDisplayMatch]);

  return (
    <div className="poster-wrapper">
      {matchPercentage > 0 && <MovieMatchPercentage percentage={matchPercentage} />}
      <Poster posterPath={posterPath} />
    </div>
  );
};

export default PosterWrapper;
