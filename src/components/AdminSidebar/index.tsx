import React from 'react';
import './style.scss';
import banner from '../../images/Banner-logo.svg';

interface AdminSidebarProps {
    sidebar?: boolean;
}

function AdminSidebar(props: AdminSidebarProps) {
    return (
        <div
            className="adminSidebar"
            style={{ flex: props.sidebar ? '4' : '0' }}
        >
            <div className="adminSidebar-header">
                <img src={banner} alt="" />
            </div>
        </div>
    );
}

export default AdminSidebar;
