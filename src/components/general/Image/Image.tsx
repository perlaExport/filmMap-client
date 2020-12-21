import React from "react";
import fallbackImage from "assets/images/image_not_loaded.svg";

interface ImageProps extends React.ComponentProps<"img"> {
    imageURL: string,
}

const Image: React.FC<ImageProps> = ({ imageURL, ...props }) => {
	const fallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = fallbackImage;
	};

	return <img {...props} alt="" src={imageURL} onError={fallback} />;
};

export default Image;
