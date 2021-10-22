import React from 'react';
import { useHistory } from 'react-router';
import AdminHeader from '../../components/AdminHeader';
import AdminMainScreen from '../../components/AdminMainScreen';
import AdminSidebar from '../../components/AdminSidebar';
import './style.scss';

function Admin() {
    const history = useHistory();
    const [haveSidebar, setHaveSidebar] = React.useState(true);

    const handleLogout = () => {
        console.log('Logged out');
        history.push('/');
    };

    const handleOpenSidebar = () => {
        setHaveSidebar(!haveSidebar);
    };

    return (
        <div className="adminPage">
            <AdminSidebar sidebar={haveSidebar}></AdminSidebar>
            <div className="adminPage-content">
                <AdminHeader
                    Logout={handleLogout}
                    openSidebar={handleOpenSidebar}
                ></AdminHeader>
                <AdminMainScreen></AdminMainScreen>
            </div>
        </div>
    );
}

export default Admin;
