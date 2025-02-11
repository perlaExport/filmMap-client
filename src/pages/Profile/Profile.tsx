import React, { useContext } from "react";
import { UserContext } from "context/UserContext";
import "./Profile.scss";
import LoadingWrapper from "components/layout/LoadingWrapper";
import { ReactComponent as LogOutIcon } from "assets/images/exit.svg";
import { IconButton } from "components/general/Button";
import ProfileNav from "./ProfileNav/ProfileNav";
import { Switch, Route, useHistory } from "react-router-dom";
import { Favourites, WatchLater, MyRatings } from "./ProfileSubPages";

const Profile: React.FC = () => {
  const history = useHistory();
  const [{ user, authStatus }, dispatchUser] = useContext(UserContext);

  const userLogOut = () => {
    dispatchUser({ type: "LOGOUT" });
    history.replace("/");
  };

  return (
    <LoadingWrapper isLoading={authStatus !== "success"} className="profile-page">
      <h2 className="username">{`@${user}`}</h2>
      <div className="user-control-container">
        <IconButton onClick={userLogOut} classes="btn-secondary" icon={<LogOutIcon />}>
          Logout
        </IconButton>
      </div>
      <ProfileNav />
      <Switch>
        <Route exact path="/profile/" component={MyRatings} />
        <Route exact path="/profile/favourites" component={Favourites} />
        <Route exact path="/profile/watchlater" component={WatchLater} />
      </Switch>
    </LoadingWrapper>
  );
};

export default Profile;
