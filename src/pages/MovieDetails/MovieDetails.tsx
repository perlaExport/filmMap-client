import React, { useEffect, useState, useContext } from 'react';
import "./MovieDetails.scss";
import { RouteComponentProps } from "react-router-dom";
import { UserContext } from "context/UserContext";
import callTMDBAPI from "helper/APICallTMDB";
import Image from "components/general/Image/Image";
import PosterBackdrop from "./PosterBackdrop/PosterBackdrop";
import { LoadingWrapper } from "components/layout";
import GenreList from "./GenreList/GenreList";
import UserMovieManager from './UserMovieManager/UserMovieManager';
import { MovieProps } from "./IMovieDetails";

const MovieDetails: React.FC<RouteComponentProps<{ movieId?: string | undefined }>> = (props) => {

    const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

    const [{authStatus}] = useContext(UserContext);

    const [movieDetails, setMoviedetails] = useState<MovieProps>({
        id: 0,
        posterPath: "",
        backdropPath: "",
        genres: [],
        overview: "",
        title: ""
    })

    const [score, setScore] = useState<number>(-1);

    useEffect(() => {
        const { movieId } = props.match.params;
        const getMovieDetailsBydId = async () => {
            const { data, status, error } = await callTMDBAPI({
                url: `/movie/${movieId}`,
                method: "GET",
            }); 
            console.log(data, status, error);
            if(status === 200) {
                const {id, poster_path, backdrop_path, genres, overview, title } = data;
                setMoviedetails({ id, posterPath: poster_path, backdropPath: backdrop_path, genres, overview,title });
            }
        }
        if(!!movieId) getMovieDetailsBydId();
        
        return () => { 
        }
    }, [props.match.params])

    return (
            <LoadingWrapper className="movie-details-page" isLoading={movieDetails.title === ""}>
                {movieDetails.backdropPath !== "" && <PosterBackdrop
                                                        posterImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.posterPath}`}
                                                        backdropImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.backdropPath}`} />}
                <section className="main-movie-details">
                    <div className="poster-wrapper">
                        <h1 className="movie-title">{movieDetails.title}</h1>
                        <Image src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${movieDetails.posterPath}`} className="movie-poster" />
                        {authStatus === "success" && <UserMovieManager setScore={setScore} score={score} />}
                      
                    </div>
                    <div className="movie-info">
                        <h1 className="movie-title">{movieDetails.title}</h1>
                        <GenreList genres={movieDetails.genres} />
                        <p className="movie-overview">{movieDetails.overview}</p>
                    </div>
                </section>
            </LoadingWrapper>
    )
}

export default MovieDetails
