import React, { useContext }  from 'react';
import { UserContext } from "context/UserContext";
import "./Profile.scss";
import { LoadingWrapper } from "components/layout";
import { ReactComponent as LogOutIcon } from "assets/images/exit.svg";
import { ReactComponent as EditIcon } from "assets/images/edit-user.svg";
import { IconButton } from "components/general/Button"
import ProfileNav from "./ProfileNav/ProfileNav";
import { Switch, Route } from "react-router-dom";
import { Favourites, WatchLater, MyRatings } from "./ProfileSubPages";


const Profile: React.FC = () => {
    
    const [{user, authStatus}] = useContext(UserContext);

    return (
        <LoadingWrapper isLoading={authStatus !== "success"} className="profile-page">
            <h2 className="username">{`@${user}`}</h2>
            <div className="user-control-container">
                <IconButton icon={<EditIcon />}>Edit Profile</IconButton>
                <IconButton classes="btn-secondary" icon={<LogOutIcon />}>Logout</IconButton>
            </div>
            <ProfileNav />
            <Switch>
                <Route exact path="/profile/" component={MyRatings} />
                <Route exact path="/profile/favourites" component={Favourites} />
                <Route exact path="/profile/watchlater" component={WatchLater} />
            </Switch>
            
        </LoadingWrapper>
    )
}

export default Profile
