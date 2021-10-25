import React, { ReactChild } from 'react';

interface ContentWrapperProps {
    children?: Array<ReactChild> | ReactChild;
}

export const ContentWrapper = (props: ContentWrapperProps) => {
    return (
        <div className="h-100 bg-white rounded p-3 shadow-sm">
            {props.children}
        </div>
    );
};
