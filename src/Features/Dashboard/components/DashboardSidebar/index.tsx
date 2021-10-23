import React from 'react';
import './style.scss';
import banner from '../../../../images/Banner-logo.svg';
import { Link } from 'react-router-dom';
interface DashboardSidebarProps {
    sidebar?: boolean;
    role?: number;
}

function DashboardSidebar(props: DashboardSidebarProps) {
    const { role } = props;
    return (
        <div className="dashboardSidebar">
            <div className="dashboardSidebar-header">
                <img src={banner} alt="" />
            </div>
            <div className="dashboardSidebar-body">
                <SidebarTitle title="CHUNG" />
                <ul className="dashboardSidebar-body-list">
                    <li>
                        <i className="bi-alarm"></i>
                        <Link to="#">Trang chủ</Link>
                    </li>
                    <li>
                        <i className="bi-alarm"></i>
                        <Link to="#">Thông tin cá nhân</Link>
                    </li>
                    <li>
                        <Link to="#">Chỉnh sửa mật khẩu</Link>
                    </li>
                    <li>
                        <Link to="#">Đăng xuất</Link>
                    </li>
                </ul>
                {role === 1 ? (
                    <>
                        <SidebarTitle title="QUẢN LÝ" />
                        <ul className="dashboardSidebar-body-list">
                            <li>
                                <Link to="#">Thống kê</Link>
                            </li>
                            <li>
                                <i className="bi-alarm"></i>
                                <Link to="#">Người dùng</Link>
                            </li>
                            <li>
                                <i className="bi-alarm"></i>
                                <Link to="#">Nhân viên</Link>
                            </li>
                            <li>
                                <Link to="#">Địa chỉ</Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <SidebarTitle title="QUẢN LÝ" />
                        <ul className="dashboardSidebar-body-list">
                            <li>
                                <Link to="#">Thống kê</Link>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

const SidebarTitle = (props: { title?: string }) => {
    return <h5 className="fw-bold">{props.title}</h5>;
};

export default DashboardSidebar;
