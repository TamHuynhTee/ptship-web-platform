import React from 'react';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { ToggleSidebar } from '../ToggleSidebar';
import defaultAvatar from '../../../../images/Logo128.png';
import './style.scss';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
    name?: string;
    phone?: string;
    avatar?: string;
}

const img = 'https://picsum.photos/seed/picsum/300/300';

const user = {
    name: 'Huỳnh Thanh Tâm',
    avatar: img,
};

function DashboardHeader(props: DashboardHeaderProps) {
    const { name, phone, avatar } = props;

    return (
        <div className="adminHeader flex width-100">
            <div className="adminHeader-sidebarBtn inlineFlex">
                <ToggleSidebar />
            </div>
            <div className="adminHeader-info flex height-100">
                <div className="adminHeader-info-item inlineFlex user btn-group">
                    <button
                        className="user-avatar dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <img
                            src={avatar ? avatar : defaultAvatar}
                            alt="avatar"
                            width={48}
                            height={48}
                        />
                        <div className="user-name">
                            <b>{name}</b>
                            <p>{phone}</p>
                        </div>
                    </button>
                    <DropdownMenu id="dropdown-user">
                        <li>
                            <Link
                                to={'/dashboard/profile'}
                                className="dropdown-item"
                            >
                                Thông tin cá nhân
                            </Link>
                        </li>
                        <li>
                            <button
                                className="dropdown-item text-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#logoutConfirm"
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

export default DashboardHeader;
