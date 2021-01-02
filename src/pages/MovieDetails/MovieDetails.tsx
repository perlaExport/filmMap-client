import React, { useEffect, useState } from 'react';
import "./MovieDetails.scss";
import callTMDBAPI from "helper/apiCallTMDB";
import Image from "components/general/Image/Image";
import PosterBackdrop from "./PosterBackdrop/PosterBackdrop";
import LoadingWrapper from "components/layout/LoadingWrapper/LoadingWrapper";
import GenreList from "./GenreList/GenreList";
import StarRating from "components/general/StarRating/StarRating";

interface MovieDetailProps {
    movieId: number
}

interface Genres {
    id: number,
    name: string
}

interface MovieDetails {
    id: number,
    posterPath?: string,
    backdropPath?: string,
    genres: Genres[],
    overview: string,
    title: string
}

const MovieDetails: React.FC<MovieDetailProps> = ({ movieId }) => {

    const { REACT_APP_TMDB_IMAGE_BASE_URL } = process.env;

    const [movieDetails, setMoviedetails] = useState<MovieDetails>({
        id: 0,
        posterPath: "",
        backdropPath: "",
        genres: [],
        overview: "",
        title: ""
    })

    const [score, setScore] = useState<number>(-1);

    useEffect(() => {

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
    }, [movieId])

    return (
            <LoadingWrapper className="movie-details-page" isLoading={movieDetails.title === ""}>
                {movieDetails.backdropPath !== "" && <PosterBackdrop
                                                        posterImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.posterPath}`}
                                                        backdropImageLink={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w1280${movieDetails.backdropPath}`} />}
                <section className="main-movie-details">
                    <div className="poster-wrapper">
                        <Image imageURL={`${REACT_APP_TMDB_IMAGE_BASE_URL}/w185${movieDetails.posterPath}`} className="movie-poster" />
                        <StarRating 
                            setScore={setScore}
                            score={score}
                            submitRating={(score) =>  {
                                console.log(`scored: ${score}`)
                            }}
                        />
                        <button onClick={() => setScore(-1)} className="link-element">remove rating</button>
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
