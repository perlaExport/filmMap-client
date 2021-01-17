import React, { useContext } from "react";
import { Switch, Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import { UserContext } from "context/UserContext";
import callAPI from "helper/api";
import { authenticationStatus } from "context/UserContext";

// PAGES
import Home from "./Home";
import Recommendations from "./Recommendations";
import MovieDetails from "./MovieDetails";
import Questionnaire from "./Questionnaire";
import Profile from "./Profile";
import SearchedMovies from "./SearchedMovies";
import Error from "./Error";
import ActivateUser from "./ActivateUser";

interface ProtectedRouteProps extends RouteProps {
  auth: authenticationStatus;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, ...props }) => {
  return auth !== "failed" ? <Route {...props} /> : <Redirect to="/" />;
};

const Routes: React.FC = () => {
  const [{ authStatus }, dispatchUser] = useContext(UserContext);

  const isUserAuthenticated = async () => {
    const { data, status } = await callAPI({
      url: "/get_current_user",
      method: "GET",
      token: true,
    });
    if (status === 200) dispatchUser({ type: "LOGIN_SUCCESS", payload: { user: data.name } });
    else dispatchUser({ type: "LOGIN_FAIL" });
  };

  const oAuthLoginRedirect = (props: RouteComponentProps) => {
    const queryparams = queryString.parse(props.location.search);
    console.log(queryparams);
    const token = queryparams.token || "";
    if (token !== "") localStorage.setItem("token", token as string);

    isUserAuthenticated();
    return <Redirect to="/" />;
  };
  const userActivation = (props: RouteComponentProps) => {
    const queryparams = queryString.parse(props.location.search);
    const token = (queryparams.token as string) || "";
    const userId = (queryparams.userId as string) || "";
    if (token === "" || userId === "") {
      return <Redirect to="/" />;
    } else {
      return <ActivateUser token={token} userId={userId} />;
    }
  };

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie" component={SearchedMovies} />
      <Route exact path="/movie/:movieId" component={MovieDetails} />
      <Route exact path="/oauth2/redirect" render={oAuthLoginRedirect} />
      <Route exact path="/user/confirmRegistration" render={userActivation} />
      <Route exact path="/error" component={Error} />
      <ProtectedRoute exact auth={authStatus} path="/recommendations" component={Recommendations} />
      <ProtectedRoute exact auth={authStatus} path="/questionnaire" component={Questionnaire} />
      <ProtectedRoute auth={authStatus} path="/profile" component={Profile} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
