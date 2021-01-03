import React from 'react'
import "./PosterBackdrop.scss";
import Image from "components/general/Image/Image";
import { usePalette } from 'react-palette';
import { PosterBackdropProps } from "./IPosterBackdrop";

const PosterBackdrop: React.FC<PosterBackdropProps> = ({ backdropImageLink, posterImageLink }) => {
    const { data, loading } = usePalette(posterImageLink);
    return (
        <div role="presentation" className={`poster-backdrop ${loading ? "hide" : ""}`} >
            <Image className="poster" draggable={false} src={backdropImageLink}  />
            <div style={{backgroundColor: data.darkVibrant}} className="poster-overlay"></div>
            <div style={{background: `linear-gradient(0, rgba(2,0,36,0) 0%, ${data.darkVibrant} 100%)`}} className="gradient"></div>
        </div>
    )
}

export default PosterBackdrop
