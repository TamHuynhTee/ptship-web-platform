import React, { ReactChild } from 'react';
import './style.scss';

interface DashboardScreenProps {
    children?: Array<ReactChild> | ReactChild;
}

function DashboardScreen(props: DashboardScreenProps) {
    return (
        <div className="dashboardScreen container py-3">{props.children}</div>
    );
}

export default DashboardScreen;
