import React, { Suspense } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Admin from '../pages/admin';
import Home from '../pages/home';
import { Loading } from '../static/Loading';
import { NotFound } from '../static/NotFound';
import { defaultRoute } from './defaultRoute';

interface IRoute {
    exact: Boolean;
    path: string;
    child: React.ReactChild | any;
}

const routes: Array<IRoute> = [
    {
        child: (
            <>
                <Home />
            </>
        ),
        path: defaultRoute.UnauthenticatedHome,
        exact: true,
    },
    {
        child: (
            <>
                <Admin />
            </>
        ),
        path: defaultRoute.AdminDashboard,
        exact: true,
    },
];

const renderRoutes = (routes: Array<IRoute>) => {
    return routes.map((r, i) => {
        if (r.exact) {
            return (
                <Route path={r.path} exact key={i}>
                    {r.child}
                </Route>
            );
        } else {
            <Route path={r.path} key={i}>
                {r.child}
            </Route>;
        }
    });
};

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Switch>
                    {renderRoutes(routes)}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
};
export default Router;
