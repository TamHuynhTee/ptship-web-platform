import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import authApi from '../../../apis/Apis/authApi';
import DashboardHeader from '../components/DashboardHeader';
import DashboardScreen from '../components/DashboardMainScreen';
import DashboardSidebar from '../components/DashboardSidebar';
import { useHistory } from 'react-router';
import './style.scss';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { ChangePassForm } from '../components';
import { Profile } from '../components/Profile';
import { DashboardHome } from '../components/DashboardHome';
import { LogoutConfirm } from '../components/LogoutConfirm';
import { Addresses, Staffs, Users } from '../Admin/pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../Slice/Auth/selector';
import { getCurrentUserAsync } from '../../../Slice/Auth/thunk';

export const Dashboard = () => {
    const { path } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        notifySuccess('Đăng xuất thành công');
        history.push('/');
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
