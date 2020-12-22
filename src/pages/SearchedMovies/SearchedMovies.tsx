import React, { useEffect, useState } from 'react';
import "./SearchedMovies.scss";
import MovieCard from "components/general/MovieCard/MovieCard";
import callTMDBAPI from "helper/apiCallTMDB";
import queryString from "query-string";

interface MovieType {
    id: number,
    title: string,
    poster_path: string
}

const SearchedMovies: React.FC = () => {

    const [resultMovies, setResultMovies] = useState<MovieType[]>([])
    const [reslutsInfo, setResultInfo] = useState<{ resCount: number, searchedTitle: string | string[]}>({ resCount: 0, searchedTitle: "None"})

    useEffect(() => {
        const getMatchedMovies = async (query: string) => {
            const { data, status, error } = await callTMDBAPI({
                url: "/search/movie",
                method: "GET",
                queryParams: { query }
            });
            console.log(data, status, error)
            if(status === 200) {
                const { results, total_results } = data;
                setResultMovies(results.map(({id, title, poster_path}: MovieType) => ( {id, title, poster_path} )))
                setResultInfo({ resCount: total_results, searchedTitle:  query });
            }
        }
        const queryparams = queryString.parse(window.location.search)
        getMatchedMovies(queryparams.title as string || "");
        return () => {
        }
    }, [])

    return (
        <div className="searched-movies-page">
           <h1 className="searched-movies-query-title">
                {"FOUND "}
                <span className="results">{reslutsInfo.resCount}</span>
                {" RESULTS FOR: "}
                <span className="searched-query">{`"${reslutsInfo.searchedTitle}"`}</span>
           </h1>
            <div className="movie-container">
                {resultMovies.map(({ id, title, poster_path}) => 
                <MovieCard
                    key={id}
                    posterImageURL={!!poster_path ? `http://image.tmdb.org/t/p/w185${poster_path}` : ""}
                    title={title}
                />
                )}
            </div>
        </div>
    )
}

export default SearchedMovies
