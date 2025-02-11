import React, { useRef, useState, useEffect } from "react";
import "./SearchMovieBar.scss";
import { searchResult } from "./";
import { useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "assets/images/search-icon.svg";
import { callTMDBAPI } from "helper/api";
import { ReactComponent as DualRingSpinner } from "assets/spinners/DualRing-yellow.svg";
import { ReactComponent as XIcon } from "assets/images/x-icon.svg";
import SearchedMovieResults from "./SearchedMovieResults";

const SearchMovieBar: React.FC = () => {
  const mounted = useRef<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFocused, setFocus] = useState<boolean>(false);

  let watingTimeout: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const setLoadingMounted = (state: boolean) => {
    if (mounted.current) setLoading(state);
  };

  const doSearch = async (query: string) => {
    const { data, status } = await callTMDBAPI({
      url: "/search/movie",
      method: "GET",
      queryParams: { query },
      setLoading: setLoadingMounted,
    });
    if (status === 200 && !!data && mounted.current) {
      const { results } = data;
      setSearchResults(results.map(({ id, title }: searchResult) => ({ id, title })));
    }
  };

  const inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (watingTimeout) clearTimeout(watingTimeout);
    watingTimeout = setTimeout(() => {
      if (searchString.length > 0) doSearch(searchString);
      else if (searchResults.length > 0) clearResults();
    }, 700);
  };

  const clearResults = () => setSearchResults([]);
  const onBlurr = () => setFocus(false);
  const onFocus = () => setFocus(true);

  const clickResultHandler = (title: string) => {
    clearResults();
    if (!!inputEl.current) {
      inputEl.current.value = title;
      inputEl.current.focus();
    }
  };

  const redirectToMovieSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!!inputEl.current) {
      const parsedSpaces = inputEl.current.value.replace("", "%20");
      history.push(`movie?title=${parsedSpaces}`);
    }
  };

  return (
    <div className="search-bar-wrapper">
      <form className={`search-movie-bar ${isFocused ? "focused" : ""}`}>
        <button type="submit" onClick={redirectToMovieSearch} className="search-icon-btn">
          <SearchIcon />
        </button>
        <input onFocus={onFocus} onBlur={onBlurr} ref={inputEl} onChange={inputOnChangeHandler} />
        <XIcon
          onClick={() => clickResultHandler("")}
          className={`x-icon ${searchResults.length > 0 && !isLoading ? "show" : ""}`}
        />
        <DualRingSpinner className={`spinner ${isLoading ? "loading" : ""}`} />
      </form>
      <SearchedMovieResults movieResults={searchResults} clickResult={clickResultHandler} />
    </div>
  );
};

export default SearchMovieBar;
