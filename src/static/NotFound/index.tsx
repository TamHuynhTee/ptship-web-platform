import React from 'react';
import { useHistory } from 'react-router';
import { defaultRoute } from '../../routers/defaultRoute';
import './style.scss';

export const NotFound = () => {
    const history = useHistory();
    return (
        <div className="container">
            <div className="notFound">
                <h2 className="fs-1">LỖI !!!</h2>
                <p className="fs-3">
                    Có vẻ như bạn lạc đường rồi, hãy kiểm tra lại đường dẫn của
                    mình.
                </p>
                <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                        history.push(defaultRoute.UnauthenticatedHome)
                    }
                >
                    Trở về trang chủ
                </button>
            </div>
        </div>
    );
};
