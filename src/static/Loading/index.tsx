import React from 'react';

interface Props {}

export const Loading = (props: Props) => {
    return (
        <div
            className="d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0"
            style={{ zIndex: 10, backgroundColor: '#0000003b' }}
        >
            <div
                className="spinner-border text-light"
                role="status"
                style={{ height: '100px', width: '100px' }}
            ></div>
        </div>
    );
};
