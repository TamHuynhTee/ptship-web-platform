import React from 'react';

interface LogoutConfirmProps {
    logOut?: any;
}

export const LogoutConfirm = (props: LogoutConfirmProps) => {
    return (
        <div
            className="modal fade"
            id="logoutConfirm"
            tabIndex={-1}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">Xác nhận thoát?</h5>
                    </div>
                    <div className="modal-body">
                        Bạn chắc muốn đăng xuất chứ ?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Không
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => props.logOut()}
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
