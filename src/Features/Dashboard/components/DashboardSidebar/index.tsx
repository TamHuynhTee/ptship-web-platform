import React from 'react';
import './style.scss';
import banner from '../../../../images/Banner-logo.svg';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { SidebarIcon } from '../SidebarIcon';
interface DashboardSidebarProps {
    sidebar?: boolean;
    role?: number;
}

function DashboardSidebar(props: DashboardSidebarProps) {
    const match = useRouteMatch();
    const { role } = props;
    return (
        <div className="dashboardSidebar">
            <div className="dashboardSidebar-header">
                <img src={banner} alt="" />
            </div>
            <div className="dashboardSidebar-body d-flex flex-column">
                <SidebarTitle title="CHUNG" />
                <ul className="dashboardSidebar-body-list">
                    <li>
                        <Link to={`${match.url}`}>
                            <SidebarIcon type="bi-house-door" />
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/profile`}>
                            <SidebarIcon type="bi-person-circle" />
                            Thông tin cá nhân
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/resetPass`}>
                            <SidebarIcon type="bi-key-fill" />
                            Chỉnh sửa mật khẩu
                        </Link>
                    </li>
                </ul>
                {role === 1 ? (
                    <>
                        <SidebarTitle title="QUẢN LÝ" />
                        <ul className="dashboardSidebar-body-list">
                            <li>
                                <Link to="#">
                                    <SidebarIcon type="bi-graph-up-arrow" />
                                    Thống kê
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/user`}>
                                    <SidebarIcon type="bi-people" />
                                    Người dùng
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/staff`}>
                                    <SidebarIcon type="bi-person-badge" />
                                    Nhân viên
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/address`}>
                                    <SidebarIcon type="bi-geo-alt" />
                                    Địa chỉ
                                </Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <SidebarTitle title="QUẢN LÝ" />
                        <ul className="dashboardSidebar-body-list">
                            <li>
                                <Link to="#">
                                    <SidebarIcon type="bi-graph-up-arrow" />
                                    Thống kê
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
                <div className="d-flex align-items-center flex-column mt-auto">
                    <button
                        className="btn btn-danger mb-3 rounded-pill"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutConfirm"
                    >
                        Đăng xuất
                    </button>
                    <span className="text-center fw-bold">PTSHIP 1.0.1</span>
                </div>
            </div>
        </div>
    );
}

const SidebarTitle = (props: { title?: string }) => {
    return <h5 className="fw-bold">{props.title}</h5>;
};

export default DashboardSidebar;
