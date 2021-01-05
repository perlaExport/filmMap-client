import React, { useState, useEffect } from 'react';
import MovieCard, { MovieCardProps }from "components/general/MovieCard";
import Pagination, { PageProps }  from "components/general/Pagination";
import { LoadingWrapper } from "components/layout";
import callAPI from "helper/APICall";


const MyRatings: React.FC = () => {

    const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;


    const [page, setPage] = useState<PageProps>({ currentPage: 0, amountOfPages: 1});
    const [movies, setMovies] = useState<MovieCardProps[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getMyRatedMovies = async () => {
            const { data, status, error } = await callAPI({
                url: "/movie/rated",
                method: "GET",
                token: true,
                setLoading,
                queryParams: {
                    limit: 8,
                    page: 0
                }
              });
              if(status === 200) {
                setMovies(data.movies.map(({ id, title, imgPath }: {id: number , title: string, imgPath?: string}) => ({movieId: id, title, posterImageURL: imgPath })));
                setPage(page => ({ ...page, amountOfPages: data.amountOfPages }))
              }

              console.log(data, status, error)
        } 
        getMyRatedMovies();
        return () => {
        }
    }, [])

    const handleChangePage = (newPage: number) => {
        setPage({...page, currentPage: newPage})
    }

    return (
        <div  className="my-ratings-subpage-container movie-list-container">
            <LoadingWrapper isLoading={isLoading} className="movies">
                {movies.map(({ movieId, title, posterImageURL}) => (
                    <MovieCard
                        key={movieId}
                        movieId={movieId}
                        title={title}
                        posterImageURL={!!posterImageURL ? `${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${posterImageURL}` : ""}
                    />
                ))}
            </LoadingWrapper>
            <Pagination currentPage={page.currentPage} handleChange={handleChangePage} amountOfPages={page.amountOfPages} />
        </div>
    )
}

export default MyRatings;
