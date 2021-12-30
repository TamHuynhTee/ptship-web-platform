import React from 'react';
import { PropagateLoader } from 'react-spinners';

export const LoadingComponent = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '300px' }}
        >
            <PropagateLoader size={30} color={'#fdb7c0'} />
        </div>
    );
};
