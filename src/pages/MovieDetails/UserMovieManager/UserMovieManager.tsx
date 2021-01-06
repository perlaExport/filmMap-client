import React from 'react';
import StarRating from "components/general/StarRating";
import { IconButton } from "components/general/Button"
import {ReactComponent as FavouriteIcon } from "assets/images/star-outline.svg";
import {ReactComponent as WatchLaterIcon } from "assets/images/clock-icon.svg";
import { UserMovieManagerProps } from "../";
import callAPI from "helper/APICall";


const UserMovieManager: React.FC<UserMovieManagerProps> = ({ setScore, score, movieDetails, isFavourite, isWatchLater, toggleAddToFavourite, toggleAddToWatchLater }) => {

    const rateMovie = async (movieScore: number) => {
        return await callAPI({
            url: `/movie/${movieDetails.id}/rate`,
            method: "PUT",
            token: true,
            queryParams: {
                rate: movieScore
            }
        });
    }

    const addMovieToDataBase = async () => {
        return await callAPI({
            url: "movie/add",
            method: "POST",
            token: true,
            payload: {
                id: movieDetails.id,
                title: movieDetails.title,
                categories: movieDetails.genres.map(({ name }) => name),
                imgPath: movieDetails.posterPath || ""
            }
        });
    } 
    const addMovieToFavoriteList = async () => {
        return await callAPI({
            url: `movie/favourites/add/${movieDetails.id}`,
            method: "POST",
            token: true,
      
        });
    } 
    const addMovieToWatchLaterList = async () => {
        return await callAPI({
            url: `movie/watch_later/add/${movieDetails.id}`,
            method: "POST",
            token: true,
        });
    } 
    const rateMovieHandler = async (score: number) => {
        const { status: rateStatus } = await rateMovie(score);
        if(rateStatus === 404) {
            const { status: addedMovieStatus } = await addMovieToDataBase();
            if(addedMovieStatus === 200) {
                const { status, error, data } = await rateMovie(score);
                console.log(status, error, data);
            }
        }
    }
    const addMovieToFavoriteHandler = async () => {
        const { status: rateStatus } = await addMovieToFavoriteList();
        if(rateStatus === 200) toggleAddToFavourite(true);
        else if(rateStatus === 404) {
            const { status: addedMovieStatus } = await addMovieToDataBase();
            if(addedMovieStatus === 200) {
                const { status } = await addMovieToFavoriteList();
                if(status === 200) toggleAddToFavourite(true);
            }
        }
    }
    const addMovieToWatchLaterHandler = async () => {
        const { status: rateStatus } = await addMovieToWatchLaterList();
        if(rateStatus === 200) toggleAddToWatchLater(true);
        else if(rateStatus === 404) {
            const { status: addedMovieStatus } = await addMovieToDataBase();
            if(addedMovieStatus === 200) {
                const { status } = await addMovieToWatchLaterList();
                if(status === 200) toggleAddToWatchLater(true);
            }
        }
    }

    const removeMovieFromFavourites = async () => {
        const shouldRemoveFromFavourites = window.confirm("Are you sure you want to remove this movie from favourites?");
        if(shouldRemoveFromFavourites) {
            const { status } = await callAPI({
                url: `/movie/favourites/delete/${movieDetails.id}`,
                method: "DELETE",
                token: true,
            });
            console.log(status);
            if(status === 200) toggleAddToFavourite(false);
        }
    }
    const removeMovieFromWatchLater = async () => {
        const shouldRemoveFromFavourites = window.confirm("Are you sure you want to remove this movie from watch later?");
        if(shouldRemoveFromFavourites) {
            const { status } = await callAPI({
                url: `/movie/watch_later/delete/${movieDetails.id}`,
                method: "DELETE",
                token: true,
            });
            console.log(status);
            if(status === 200) toggleAddToWatchLater(false);
        }
    }

    const removeMovieRating = async () => {
        const { data, status, error } = await callAPI({
            url: `/movie/${movieDetails.id}/delete_rate`,
            method: "DELETE",
            token: true
        });
        if(status === 200) setScore(-1)
        console.log(data, status, error);
    }

    return (
        <div className="user-movie-manager">
            <StarRating 
                setScore={setScore}
                score={score}
                submitRating={(movieScore) =>  rateMovieHandler(movieScore)}
            />
            {
            score > -1
                ?
                <div className="score-option-container">
                    <button onClick={removeMovieRating} className="link-element">remove rating</button>
                    <IconButton
                        icon={<FavouriteIcon/>}
                        classes={isFavourite ? "" : "btn-secondary"}
                        onClick={isFavourite ? removeMovieFromFavourites : addMovieToFavoriteHandler}
                    >Favourite</IconButton>
                </div>
                :
                <div className="score-option-container">
                    <IconButton
                        icon={<WatchLaterIcon />}
                        classes={isWatchLater ? "" : "btn-secondary"}
                        onClick={isWatchLater ?  removeMovieFromWatchLater : addMovieToWatchLaterHandler}
                    >Watch Later</IconButton>
                </div>
            }
        </div>
    )
}

export default UserMovieManager
