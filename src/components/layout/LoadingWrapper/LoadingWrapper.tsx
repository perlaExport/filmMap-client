import React from "react";
import { ReactComponent as DualRingSpinner } from "assets/spinners/DualRing-yellow.svg";
import "./LoadingWrapper.scss";

interface LoadingProps {
  isLoading: boolean;
  className?: string;
}

const LoadingWrapper: React.FC<LoadingProps> = ({
  isLoading,
  className,
  ...props
}) => {
  return (
    <div {...props} className="loading-wrapper">
      {isLoading ? (
        <DualRingSpinner />
      ) : (
        <div className={`loaded-content ${className || ""}`}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;
