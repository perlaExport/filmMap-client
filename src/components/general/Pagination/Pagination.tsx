import React from "react";
import "./Pagination.scss";
import { ReactComponent as Arrow } from "assets/images/arrow-icon.svg";
import { PaginationProps } from "./";

const Pagination: React.FC<PaginationProps> = ({ currentPage, amountOfPages, handleChange }) => {
  const previousePage = () => {
    handleChange(currentPage - 1);
  };
  const nextPage = () => {
    handleChange(currentPage + 1);
  };

  const leftArrowSide = () => {
    if (currentPage !== 1) {
      return (
        <>
          <button onClick={previousePage} className=" pagination-item arrow">
            <Arrow className="arrow-left" />
          </button>
          <div className={`three-dots ${currentPage - 1 === 1 ? "hide" : ""}`}>...</div>
          <button onClick={previousePage} className="pagination-item">
            {currentPage - 1}
          </button>
        </>
      );
    } else {
      return <div className="empty"></div>;
    }
  };

  const rightArrowSide = () => {
    if (currentPage !== amountOfPages) {
      return (
        <>
          <button onClick={nextPage} className="pagination-item">
            {currentPage + 1}
          </button>
          <div className={`three-dots ${currentPage + 1 === amountOfPages ? "hide" : ""}`}>...</div>
          <button onClick={nextPage} className="pagination-item arrow">
            <Arrow className="arrow-right" />
          </button>
        </>
      );
    } else return <div className="empty"></div>;
  };

  if (amountOfPages >= 2) {
    return (
      <nav className="pagination-container">
        {leftArrowSide()}
        <button className="pagination-item current-page">{currentPage}</button>
        {rightArrowSide()}
      </nav>
    );
  } else return null;
};

export default Pagination;
