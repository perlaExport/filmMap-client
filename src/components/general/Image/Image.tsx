import React from "react";
import fallbackImage from "assets/images/image_not_loaded.svg";

const Image: React.FC<React.ComponentProps<"img">> = (props) => {
  const fallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
  };

  return <img {...props} alt="" onError={fallback} />;
};

export default Image;
