import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import './style.scss';

interface AdminHeaderProps {
    Logout?: Function;
    openSidebar: Function;
}

const img = 'https://picsum.photos/seed/picsum/300/300';

const user = {
    name: 'Huỳnh Thanh Tâm',
    avatar: img,
};

function AdminHeader(props: AdminHeaderProps) {
    const handleLogout = () => {
        props.Logout!();
        // console.log('Logged out');
        // history.push('/');
    };

    return (
        <div className="adminHeader flex width-100">
            <div className="adminHeader-sidebarBtn inlineFlex">
                <button onClick={() => props.openSidebar()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="currentColor"
                        className="bi bi-list"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                        />
                    </svg>
                </button>
            </div>
            <div className="adminHeader-info flex height-100">
                <div className="adminHeader-info-item inlineFlex user btn-group">
                    <button
                        className="user-avatar dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <img
                            src={user.avatar}
                            alt="avatar"
                            width={36}
                            height={36}
                        />
                        <span className="user-name">
                            <b>{user.name}</b>
                        </span>
                    </button>
                    <DropdownMenu id="dropdown-user">
                        <li>
                            <button className="dropdown-item">
                                Thông tin cá nhân
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </li>
                    </DropdownMenu>
                </div>
                <div className="adminHeader-info-item inlineFlex notification btn-group">
                    <button
                        className="notification-icon"
                        data-bs-toggle="dropdown"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-bell"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>
                    </button>
                    <DropdownMenu id="dropdown-notification">
                        <li>
                            <button className="dropdown-item">Tin mới</button>
                        </li>
                    </DropdownMenu>
                </div>
                <div className="adminHeader-info-item inlineFlex"></div>
            </div>
        </div>
    );
}

export default AdminHeader;
