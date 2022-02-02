import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { setCurrentUser } from '../../../Slice/Auth';
import { selectCurrentUser } from '../../../Slice/Auth/selector';
import { getCurrentUserAsync } from '../../../Slice/Auth/thunk';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { Addresses, Staffs, Users } from '../Admin/pages';
import { ChangePassForm } from '../components';
import DashboardHeader from '../components/DashboardHeader';
import { DashboardHome } from '../components/DashboardHome';
import DashboardScreen from '../components/DashboardMainScreen';
import DashboardSidebar from '../components/DashboardSidebar';
import { LogoutConfirm } from '../components/LogoutConfirm';
import { Profile } from '../components/Profile';
import { Statistic } from '../Statistic';
import './style.scss';

export const Dashboard = () => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const handleLogout = () => {
        history.push('/');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setCurrentUser(undefined);
        notifySuccess('Đăng xuất thành công');
    };

    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/');
            notifyError('Vui lòng đăng nhập');
        }
    }, []);

    React.useEffect(() => {
        dispatch(getCurrentUserAsync());
    }, []);

    return (
        <div className="dashboard">
            <DashboardSidebar role={user?.role}></DashboardSidebar>
            <div className="dashboard-content">
                <DashboardHeader
                    name={user?.displayName}
                    avatar={user?.avatar}
                    phone={user?.phone}
                ></DashboardHeader>
                <DashboardScreen>
                    <Switch>
                        <Route exact path={path} component={DashboardHome} />
                        <Route path={`${path}/profile`}>
                            <Profile
                                displayName={user?.displayName}
                                phone={user?.phone}
                                address={user?.address}
                                avatar={user?.avatar}
                                code={user?.area?.code}
                            />
                        </Route>
                        <Route
                            path={`${path}/resetPass`}
                            component={ChangePassForm}
                        />
                        <Route
                            path={`${path}/statistic`}
                            component={Statistic}
                        />
                        {/* Admin routes */}
                        <Route path={`${path}/user`} component={Users} />
                        <Route path={`${path}/staff`} component={Staffs} />
                        <Route path={`${path}/address`} component={Addresses} />
                    </Switch>
                </DashboardScreen>
            </div>
            <LogoutConfirm logOut={handleLogout} />
        </div>
    );
};
