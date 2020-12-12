import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// PAGES
import Home from "./Home/Home";
import Recommendations from "./Recommendations/Recommendations";
import MovieDetails from "./MovieDetails/MovieDetails";
import Questionnaire from "./Questionnaire/Questionnaire";
import Profile from "./Profile/Profile";

interface ProtectedRouteProps {
    auth: boolean,
    path: string,
    render?: any,
    component?: any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, path, render, component }) => {
	return auth ? <Route exact path={path} render={render} component={component} /> : <Redirect to="/" />;
}

const Routes: React.FC<{isAuth: boolean}> = ({ isAuth }) => {
    return (
        <Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/movie/:movieId" component={MovieDetails} />
			<ProtectedRoute auth={isAuth} path="/recommendations" component={Recommendations} />
			<ProtectedRoute auth={isAuth} path="/questionnaire" component={Questionnaire} />
			<ProtectedRoute auth={isAuth} path="/profile" component={Profile} />
			{/* <Route render={() => <Redirect to="/" />} /> */}
		</Switch>
    )
}

export default Routes
