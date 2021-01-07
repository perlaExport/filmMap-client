import React from "react";
import { searchResult } from "./";

interface SearchedMovieResultsProps {
  movieResults: searchResult[];
  clickResult: (title: string) => void;
}

const SearchedMovieResults: React.FC<SearchedMovieResultsProps> = ({
  movieResults,
  clickResult,
}) => {
  return (
    <div className="search-results">
      {movieResults.map(({ id, title }) => (
        <div onClick={() => clickResult(title)} key={id} className="result">
          {title}
        </div>
      ))}
    </div>
  );
};

export default SearchedMovieResults;
