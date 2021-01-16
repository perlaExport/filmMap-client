import React, { useState, useEffect } from "react";
import "./Poster.scss";
import Image from "components/general/Image";
import { PosterProps } from "./";
import MovieMatchPercentage from "components/general/MovieMatchPercentage";
import callAPI from "helper/api";

const Poster: React.FC<PosterProps> = ({ posterPath, movieId, shouldDisplayMatch }) => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

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
      <Image src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterPath}`} className="movie-poster" />
    </div>
  );
};

export default Poster;
