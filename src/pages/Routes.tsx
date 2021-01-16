import React, { useContext } from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import queryString from "query-string";
import { UserContext } from "context/UserContext";

// PAGES
import Home from "./Home";
import Recommendations from "./Recommendations/Recommendations";
import MovieDetails from "./MovieDetails";
import Questionnaire from "./Questionnaire/Questionnaire";
import Profile from "./Profile/Profile";
import SearchedMovies from "./SearchedMovies";
import { authenticationStatus } from "context/UserContext";
import callAPI from "helper/api";

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

  const oAuthLoginRedirect = (props: any) => {
    const queryparams = queryString.parse(props.location.search);
    console.log(queryparams);
    const token = queryparams.token || "";
    if (token !== "") localStorage.setItem("token", token as string);

    isUserAuthenticated();
    return <Redirect to="/" />;
  };

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie" component={SearchedMovies} />
      <Route exact path="/movie/:movieId" component={MovieDetails} />
      <Route exact path="/oauth2/redirect" render={oAuthLoginRedirect} />
      <ProtectedRoute exact auth={authStatus} path="/recommendations" component={Recommendations} />
      <ProtectedRoute exact auth={authStatus} path="/questionnaire" component={Questionnaire} />
      <ProtectedRoute auth={authStatus} path="/profile" component={Profile} />
      {/* <Route render={() => <Redirect to="/" />} /> */}
    </Switch>
  );
};

export default Routes;
