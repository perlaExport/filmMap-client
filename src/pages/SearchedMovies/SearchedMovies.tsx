import React, { useEffect, useState } from 'react';
import "./SearchedMovies.scss";
import MovieCard from "components/general/MovieCard/MovieCard";
import callTMDBAPI from "helper/apiCallTMDB";
import queryString from "query-string";
import LoadingWrapper from "components/layout/LoadingWrapper/LoadingWrapper";
import Pagination from "components/general/Pagination/Pagination";

interface MovieType {
    id: number,
    title: string,
    poster_path: string
}
interface ResultInfo {
    resCount: number,
    searchedTitle: string | string[]
}
interface PageProps {
    currentPage: number,
    amountOfPages: number
}

const SearchedMovies: React.FC = () => {

    const [resultMovies, setResultMovies] = useState<MovieType[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [reslutsInfo, setResultInfo] = useState<ResultInfo>({ resCount: 0, searchedTitle: "None"})
    const [page, setPage] = useState<PageProps>({ currentPage: 1, amountOfPages: 1});

    useEffect(() => {
        const getMatchedMovies = async (query: string) => {
            const { data, status } = await callTMDBAPI({
                url: "/search/movie",
                method: "GET",
                queryParams: { query, page: page.currentPage },
                setLoading
            });
            if(status === 200) {
                const { results, total_results, total_pages } = data;
                setResultMovies(results.map(({id, title, poster_path}: MovieType) => ( {id, title, poster_path} )))
                setResultInfo({ resCount: total_results, searchedTitle:  query });
                setPage(pageState => ({ ...pageState, amountOfPages: total_pages}));
            }
        }
        const queryparams = queryString.parse(window.location.search)
        getMatchedMovies(queryparams.title as string || "");
        return () => {
        }
    }, [page.currentPage])
    
    const handleChangePage = (newPage: number) => {
        setPage({...page, currentPage: newPage})
    }

    return (
        <div className="searched-movie-wrapper">
            <LoadingWrapper isLoading={isLoading}  className="searched-movies-page">
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
            </LoadingWrapper>
            <Pagination currentPage={page.currentPage} handleChange={handleChangePage} amountOfPages={page.amountOfPages} />
        </div>
    )
}

export default SearchedMovies
