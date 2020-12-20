import React, { useRef, useState } from 'react';
import "./SearchMovieBar.scss";
import { ReactComponent as SearchIcon } from "assets/images/search-icon.svg"; 
import callTMDBAPI from "helper/apiCallTMDB";
import {ReactComponent as DualRingSpinner} from "assets/spinners/DualRing-yellow.svg";
import {ReactComponent as XIcon} from "assets/images/x-icon.svg";


interface searchResult {
    id: number,
    title: string
}

const SearchMovieBar: React.FC = () => {

    const inputEl = useRef<HTMLInputElement>(null);
    const [searchResults, setSearchResults] = useState<searchResult[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    let watingTimeout: ReturnType<typeof setTimeout> | null = null;

    const doSearch = async (query: string) => {
        const { data, status, error } = await callTMDBAPI({
            url: "/search/movie",
            method: "GET",
            queryParams: { query },
            setLoading
        });
        if(status === 200 && !!data) {
            const { results } = data;
            setSearchResults(results.map(({id, title}: searchResult) => ({id, title})))
        }
        console.log(data, status, error)
    }

    const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
		if (watingTimeout) clearTimeout(watingTimeout);
		watingTimeout = setTimeout(() => {
			if(searchString.length > 0) doSearch(searchString);
            else if(searchResults.length > 0) clearResults();
		}, 700);
    }

    const clearResults = () => setSearchResults([])
    
    const clickResultHandler = (title: string) => {
        clearResults()
        if (!!inputEl.current) inputEl.current.value = title
    }

    return (
        <div className="search-bar-wrapper">
            <div className="search-movie-bar">
                <button className="search-icon-btn"><SearchIcon /></button>
                <input ref={inputEl} type="text" onChange={handlerOnChange} />
                <XIcon onClick={() => clickResultHandler("")} className={`x-icon ${searchResults.length > 0 && !isLoading? "show" : ""}`} />
                <DualRingSpinner className={`spinner ${isLoading ? "loading" : ""}`} />
            </div>
            <div className="search-results">
                {
                    searchResults.map(({id, title}) => (
                        <div onClick={() => clickResultHandler(title)} key={id} className="result">{title}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchMovieBar
