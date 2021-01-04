import React, { useState, useEffect } from 'react';
import MovieCard from "components/general/MovieCard/MovieCard";
import { MovieCardProps } from "components/general/MovieCard/IMovieCard";
import Pagination from "components/general/Pagination/Pagination";
import { PageProps } from "components/general/Pagination/IPagination";
import { LoadingWrapper } from "components/layout";
import callAPI from "helper/APICall";
import { createTypePredicateNodeWithModifier, toEditorSettings } from 'typescript';


const testMovies = [
    {movieId: 1, title: "title 1", posterImageURL: "test"},
    {movieId: 2, title: "title 2", posterImageURL: "test"},
    {movieId: 3, title: "title 3", posterImageURL: "test"},
    {movieId: 4, title: "title 4", posterImageURL: "test"},
    {movieId: 5, title: "title 5", posterImageURL: "test"},
    {movieId: 6, title: "title 6", posterImageURL: "test"},
    {movieId: 7, title: "title 7", posterImageURL: "test"},
    {movieId: 8, title: "title 8", posterImageURL: "test"},
    {movieId: 9, title: "title 9", posterImageURL: "test"},
    {movieId: 10, title: "title 10", posterImageURL: "test"},
]


const MyRatings: React.FC = () => {

    const [page, setPage] = useState<PageProps>({ currentPage: 1, amountOfPages: 1});
    const [movies, setMovies] = useState<MovieCardProps[]>(testMovies);

    useEffect(() => {
        const getMyRatedMovies = async () => {
            const { data, status, error } = await callAPI({
                url: "/get_current_user",
                method: "GET",
                token: true
              });
              console.log(data, status, error)
        } 
        // getMyRatedMovies();
        return () => {
        }
    }, [])

    const handleChangePage = (newPage: number) => {
        setPage({...page, currentPage: newPage})
    }

    return (
        <div  className="my-ratings-subpage-container movie-list-container">
            <LoadingWrapper isLoading={false} className="movies">
                {movies.map(({ movieId, title, posterImageURL}) => (
                    <MovieCard key={movieId} movieId={movieId} posterImageURL={posterImageURL} title={title}  />
                ))}
            </LoadingWrapper>
            <Pagination currentPage={page.currentPage} handleChange={handleChangePage} amountOfPages={page.amountOfPages} />
        </div>
    )
}

export default MyRatings;
