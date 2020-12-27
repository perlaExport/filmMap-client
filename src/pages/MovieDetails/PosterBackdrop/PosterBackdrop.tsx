import React from 'react'
import "./PosterBackdrop.scss";
import Image from "components/general/Image/Image";
import { usePalette } from 'react-palette'

interface PosterBackdropProps {
    posterPath: string
}

const PosterBackdrop: React.FC<PosterBackdropProps> = ({ posterPath }) => {
    const { data } = usePalette(posterPath);
    return (
        <div role="presentation" className="poster-backdrop" >
            <Image className="poster" draggable={false} imageURL={posterPath}  />
            <div style={{backgroundColor: data.darkVibrant}} className="poster-overlay"></div>
            <div style={{background: `linear-gradient(0, rgba(2,0,36,0) 0%, ${data.darkVibrant} 100%)`}} className="gradient"></div>
        </div>
    )
}

export default PosterBackdrop
