import React, { useEffect, useState, useContext } from 'react';
import "./MovieDetails.scss";
import { RouteComponentProps } from "react-router-dom";
import { UserContext } from "context/UserContext";
import callAPI from "helper/APICall";
import callTMDBAPI from "helper/APICallTMDB";
import Image from "components/general/Image";
import { LoadingWrapper } from "components/layout";
import { GenreList, PosterBackdrop, UserMovieManager, MovieProps } from "./";

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
            const { data, status } = await callTMDBAPI({
                url: `/movie/${movieId}`,
                method: "GET",
            }); 
            if(status === 200) {
                const {id, poster_path, backdrop_path, genres, overview, title } = data;
                setMoviedetails({ id, posterPath: poster_path, backdropPath: backdrop_path, genres, overview,title });
            }
        }
        const getMovieRating = async () => {
            const { data, status } = await callAPI({
                url: `/movie/${movieId}`,
                method: "GET",
                token: true,
            });
            if(status === 200) setScore(data.userRate - 1)
        } 
        if(!!movieId && (authStatus === "failed" || authStatus === "success")) {
            getMovieDetailsBydId();
            getMovieRating();
        }

        
        return () => { 
        }
    }, [props.match.params, authStatus])

    return (
            <LoadingWrapper className="movie-details-page" isLoading={movieDetails.title === ""}>
                {movieDetails.backdropPath !== "" && <PosterBackdrop
                                                        posterImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.posterPath}`}
                                                        backdropImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.backdropPath}`} />}
                <section className="main-movie-details">
                    <div className="poster-wrapper">
                        <h1 className="movie-title">{movieDetails.title}</h1>
                        <Image src={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${movieDetails.posterPath}`} className="movie-poster" />
                        {
                            authStatus === "success" && 
                            <UserMovieManager
                                movieDetails={movieDetails}
                                setScore={setScore}
                                score={score}
                            />
                        }
                      
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
