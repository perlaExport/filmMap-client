import React from 'react'
import "./ProfileNav.scss";
import { NavLink } from "react-router-dom";
import { IconButton } from "components/general/Button";
import { ReactComponent as MovieTapeIcon } from "assets/images/movie-icon.svg";
import { ReactComponent as FavouriteIcon } from "assets/images/star-outline.svg";
import { ReactComponent as WatchLaterIcon } from "assets/images/clock-icon.svg";


const ProfileNav: React.FC = () => {
    return (
        <nav className="profile-nav">
            <NavLink exact className="nav-link" to="/profile/" >
                <IconButton icon={<MovieTapeIcon />}>My Ratings</IconButton>
            </NavLink>
            <NavLink exact className="nav-link" to="/profile/favourites" >
                <IconButton icon={<FavouriteIcon />}>Favourites</IconButton>
            </NavLink>
            <NavLink exact className="nav-link" to="/profile/watchlater" >
                <IconButton icon={<WatchLaterIcon />}>Watch Later</IconButton>
            </NavLink>
        </nav>
    )
}

export default ProfileNav
