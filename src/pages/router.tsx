import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const router = () => {
    return (
        <Switch>
			<Route exact path="/" component={authStatus === "success" ? DashboardPage : WelcomePage} />
			<Route render={() => <Redirect to="/" />} />
		</Switch>
    )
}

export default router
