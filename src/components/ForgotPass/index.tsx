import React, { useState } from 'react';
import './style.scss';

interface ForgotPassProps {
    ChangePage: Function;
}

function ForgotPass(props: ForgotPassProps) {
    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="login-form">
                <h3>QUÊN MẬT KHẨU</h3>
                <p className="mb-2">
                    Hãy gọi đến số điện thoại 0908xxxxxx để được hỗ trợ lấy lại
                    mật khẩu
                </p>

                <div className="d-grid gap-2">
                    <input
                        id="login-btn"
                        type="submit"
                        value="TÀI KHOẢN MỚI"
                        style={{ backgroundColor: '#FDB7C0', border: 'none' }}
                        className="btn btn-success"
                        onClick={() => handleChangePage(3)}
                    />
                    <input
                        id="forgot-btn"
                        type="button"
                        value="QUAY LẠI"
                        style={{
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white',
                        }}
                        className="btn"
                        onClick={() => handleChangePage(1)}
                    />
                </div>
            </div>
        </form>
    );
}

export default ForgotPass;
