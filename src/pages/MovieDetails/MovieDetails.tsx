import React, { useEffect, useState } from 'react';
import "./MovieDetails.scss";
import callTMDBAPI from "helper/apiCallTMDB";
// import Image from "components/general/Image/Image";
import PosterBackdrop from "./PosterBackdrop/PosterBackdrop";
import LoadingWrapper from "components/layout/LoadingWrapper/LoadingWrapper";

interface MovieDetailProps {
    movieId: number
}

const MovieDetails: React.FC<MovieDetailProps> = ({ movieId }) => {

    const [movieDetails, setMoviedetails] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(true)


    useEffect(() => {

        const getMovieDetailsBydId = async () => {
            const { data, status, error } = await callTMDBAPI({
                url: `/movie/${movieId}`,
                method: "GET",
                setLoading
            }); 
            console.log(data, status, error);
            if(status === 200) {
                setMoviedetails(data.backdrop_path);
            }
        }
        if(!!movieId) getMovieDetailsBydId();
        
        return () => { 
        }
    }, [movieId])

    return (
        <div className="movie-details-page">
            <LoadingWrapper isLoading={isLoading}>
                {movieDetails !== "" && <PosterBackdrop posterPath={`http://image.tmdb.org/t/p/w1280${movieDetails}`} />}
                <section className="main-movie-details">
                    test
                </section>
            </LoadingWrapper>
        </div>
    )
}

export default MovieDetails
