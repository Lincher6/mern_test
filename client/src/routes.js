import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {AuthPage} from "./pages/AuthPage";
import {CreatePage} from "./pages/CreatePage";
import {DescriptionPage} from "./pages/DescriptionPage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path={'/links'} exact>
                    <LinksPage/>
                </Route>
                <Route path={'/create'} exact>
                    <CreatePage/>
                </Route>
                <Route path={'/description/:id'}>
                    <DescriptionPage/>
                </Route>
                <Redirect to={'/create'}/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path={'/'} exact>
                    <AuthPage/>
                </Route>
                <Redirect to={'/'}/>
            </Switch>
        )
    }
}