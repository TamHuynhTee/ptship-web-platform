import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import DashboardHeader from '../components/DashboardHeader';
import DashboardScreen from '../components/DashboardMainScreen';
import DashboardSidebar from '../components/DashboardSidebar';
import './style.scss';

interface Props {}

export const Dashboard = (props: Props) => {
    const match = useRouteMatch();
    // console.log(match);
    const role = 1;
    return (
        <div className="dashboard">
            <DashboardSidebar role={role}></DashboardSidebar>
            <div className="dashboard-content">
                <DashboardHeader></DashboardHeader>
                <DashboardScreen>
                    <Switch>
                        <Route exact path={match.url} />
                        <Route exact path={match.url} />
                        <Route exact path={match.url} />
                    </Switch>
                </DashboardScreen>
            </div>
        </div>
    );
};
