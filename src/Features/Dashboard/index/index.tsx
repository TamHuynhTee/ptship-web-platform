import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import authApi from '../../../apis/Apis/authApi';
import DashboardHeader from '../components/DashboardHeader';
import DashboardScreen from '../components/DashboardMainScreen';
import DashboardSidebar from '../components/DashboardSidebar';
import { useHistory } from 'react-router';
import './style.scss';
import { notifySuccess } from '../../../utils/notify';
import { ChangePassForm } from '../components';
import { Profile } from '../components/Profile';
import { DashboardHome } from '../components/DashboardHome';
import { LogoutConfirm } from '../components/LogoutConfirm';
import { AddressDetail, Addresses, Staffs, Users } from '../Admin/pages';

export const Dashboard = () => {
    const { path } = useRouteMatch();
    const [data, setData] = React.useState<any>({});
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        notifySuccess('Đăng xuất thành công');
        history.push('/');
    };

    React.useEffect(() => {
        const getUser = async () => {
            const response: any = await authApi.getUser();
            setData(response.data);
        };
        getUser();
    }, []);

    return (
        <div className="dashboard">
            <DashboardSidebar role={data.role}></DashboardSidebar>
            <div className="dashboard-content">
                <DashboardHeader
                    name={data.displayName}
                    avatar={data.avatar}
                    phone={data.phone}
                ></DashboardHeader>
                <DashboardScreen>
                    <Switch>
                        <Route exact path={path} component={DashboardHome} />
                        <Route path={`${path}/profile`}>
                            <Profile
                                displayName={data.displayName}
                                phone={data.phone}
                                address={data.address}
                                avatar={data.avatar}
                                code={data.area?.code}
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
                        <Route
                            exact
                            path={`${path}/address/:id`}
                            component={AddressDetail}
                        />
                    </Switch>
                </DashboardScreen>
            </div>
            <LogoutConfirm logOut={handleLogout} />
        </div>
    );
};
