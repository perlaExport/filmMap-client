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

    useEffect(() => {
        const getMatchedMovies = async (query: string | string[] | null) => {
            const { data, status, error } = await callTMDBAPI({
                url: "/search/movie",
                method: "GET",
                queryParams: { query }
            });
            console.log(data, status, error)
            if(status === 200) {
                const { results } = data;
                setResultMovies(results.map(({id, title, poster_path}: MovieType) => ( {id, title, poster_path} )))
            }
        }
        const queryparams = queryString.parse(window.location.search)
        if(queryparams !== {} && queryparams.title !== "") getMatchedMovies(queryparams.title);
        

        return () => {
        }
    }, [])

    return (
        <div className="searched-movies-page">
            <div className="movie-container">
                {resultMovies.map(({ id, title, poster_path}) => 
                <MovieCard
                    key={id}
                    posterImageURL={`http://image.tmdb.org/t/p/w185${poster_path}`}
                    title={title}
                />
                )}
            </div>
        </div>
    )
}

export default SearchedMovies
