import React from "react";
import "./Pagination.scss";
import { ReactComponent as Arrow } from "assets/images/arrow-icon.svg";

interface PaginationProps {
    currentPage: number,
    amountOfPages: number,
    handleChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, amountOfPages, handleChange }) => {
	const previousePage = () => {
			handleChange(currentPage - 1);
	};
	const nextPage = () => {
		handleChange(currentPage + 1);
	};
	if(	amountOfPages < 2) return null
	 else return (
		<nav className="pagination-container">
			{currentPage !== 1 ? (
				<>
					<button onClick={previousePage} className=" pagination-item arrow">
                        <Arrow className="arrow-left" />
					</button>
					<div className={`three-dots ${currentPage - 1 === 1 ? "hide" : ""}`}>...</div>
					<button onClick={previousePage} className="pagination-item">
						{currentPage - 1}
					</button>
				</>
			) : (
				<div className="empty"></div>
			)}
			<button className="pagination-item current-page">{currentPage}</button>
			{currentPage !== amountOfPages ? (
				<>
					<button onClick={nextPage} className="pagination-item">
						{currentPage + 1}
					</button>
					<div className={`three-dots ${currentPage + 1 === amountOfPages ? "hide" : ""}`}>...</div>
					<button onClick={nextPage} className="pagination-item arrow">
                        <Arrow className="arrow-right" />
					</button>
				</>
			) : (
				<div className="empty"></div>
			)}
		</nav>
	);
};

export default Pagination;
