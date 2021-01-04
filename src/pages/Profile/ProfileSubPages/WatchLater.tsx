import React, { useState } from 'react';
import MovieCard from "components/general/MovieCard/MovieCard";
import Pagination from "components/general/Pagination/Pagination";
import { PageProps } from "components/general/Pagination/IPagination";
import { LoadingWrapper } from "components/layout";


const testMovies = [
    {id: 1, title: "title 1", imageURL: "test"},
    {id: 2, title: "title 2", imageURL: "test"},
    {id: 3, title: "title 3", imageURL: "test"},
    {id: 4, title: "title 4", imageURL: "test"},
    {id: 5, title: "title 5", imageURL: "test"},
    {id: 6, title: "title 6", imageURL: "test"},
    {id: 7, title: "title 7", imageURL: "test"},
    {id: 8, title: "title 8", imageURL: "test"},
    {id: 9, title: "title 9", imageURL: "test"},
    {id: 10, title: "title 10", imageURL: "test"},
]


const WatchLater: React.FC = () => {
    const [page, setPage] = useState<PageProps>({ currentPage: 1, amountOfPages: 1});

    const handleChangePage = (newPage: number) => {
        setPage({...page, currentPage: newPage})
    }

    return (
        <div  className="watch-later-subpage-container movie-list-container">
            <LoadingWrapper isLoading={false} className="movies">
                {testMovies.map(({ id, title, imageURL}) => (
                    <MovieCard key={id} movieId={id} posterImageURL={imageURL} title={title}  />
                ))}
            </LoadingWrapper>
            <Pagination currentPage={page.currentPage} handleChange={handleChangePage} amountOfPages={page.amountOfPages} />
        </div>
    )
}

export default WatchLater;
