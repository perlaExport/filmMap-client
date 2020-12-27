import React, { useEffect } from 'react';
import "./MovieDetails.scss";
import callTMDBAPI from "helper/apiCallTMDB";

interface MovieDetailProps {
    movieId: number
}

const MovieDetails: React.FC<MovieDetailProps> = ({ movieId }) => {

    useEffect(() => {

        const getMovieDetailsBydId = async () => {
            const { data, status, error } = await callTMDBAPI({
                url: `/movie/${movieId}`,
                method: "GET",
            }); 
            console.log(data, status, error);
        }
        if(!!movieId) getMovieDetailsBydId();
        
        return () => { 
        }
    }, [movieId])

    return (
        <div className="movie-details-page">
            Movie Details
        </div>
    )
}

export default MovieDetails
