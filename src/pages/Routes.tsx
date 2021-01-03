import React from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";

// PAGES
import Home from "./Home/Home";
import Recommendations from "./Recommendations/Recommendations";
import MovieDetails from "./MovieDetails/MovieDetails";
import Questionnaire from "./Questionnaire/Questionnaire";
import Profile from "./Profile/Profile";
import SearchedMovies from "./SearchedMovies/SearchedMovies";

type authStatusType = "success" | "failed" | null

interface ProtectedRouteProps extends RouteProps {
    auth: authStatusType,
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, path, render, component }) => {
	return auth !== "failed" ? <Route path={path} render={render} component={component} /> : <Redirect to="/" />;
}

const Routes: React.FC<{ authStatus: authStatusType }> = ({ authStatus }) => {
    return (
        <Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/movie" component={SearchedMovies} />
			<Route exact path="/movie/:movieId" render={({match}) => <MovieDetails movieId={match.params.movieId} />} />
			<ProtectedRoute exact auth={authStatus} path="/recommendations" component={Recommendations} />
			<ProtectedRoute exact auth={authStatus} path="/questionnaire" component={Questionnaire} />
			<ProtectedRoute auth={authStatus} path="/profile" component={Profile} />
			{/* <Route render={() => <Redirect to="/" />} /> */}
		</Switch>
    )
}

export default Routes
