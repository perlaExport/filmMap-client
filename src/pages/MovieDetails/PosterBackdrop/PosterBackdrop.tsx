import React from "react";
import "./PosterBackdrop.scss";
import Image from "components/general/Image";
import { usePalette } from "react-palette";
import { PosterBackdropProps } from "./";

const PosterBackdrop: React.FC<PosterBackdropProps> = ({ backdropPath, posterPath }) => {
  const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;
  const posterImageLink = `${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${posterPath}`;
  const backdropImageLink = `${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${backdropPath}`;
  const { data, loading } = usePalette(posterImageLink);
  return (
    <div role="presentation" className={`poster-backdrop ${loading ? "hide" : ""}`}>
      <Image className="poster" draggable={false} src={backdropImageLink} />
      <div style={{ backgroundColor: data.darkVibrant }} className="poster-overlay"></div>
      <div
        style={{
          background: `linear-gradient(0, rgba(2,0,36,0) 0%, ${data.darkVibrant} 100%)`,
        }}
        className="gradient"></div>
    </div>
  );
};

export default PosterBackdrop;
