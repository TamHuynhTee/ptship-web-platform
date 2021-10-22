import React, { useState } from 'react';
import './style.scss';

interface LoginFormProps {
    Login: Function;
    error: string;
    ChangePage: Function;
}

function LoginForm(props: LoginFormProps) {
    const [info, setInfo] = useState({ phone: '', password: '' });
    const [showPass, setShowPass] = React.useState(false);

    const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        props.Login(info);
    };

    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    const handleShowPass = (e: {
        target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
        setShowPass(e.target.checked);
        const type = showPass ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="login-form">
                <h3>ĐĂNG NHẬP</h3>
                {props.error !== '' ? (
                    <div className="alert alert-danger">{props.error}</div>
                ) : (
                    ''
                )}
                {/* input */}
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phone"
                        placeholder="Số điện thoại"
                        onChange={(e) =>
                            setInfo({ ...info, phone: e.target.value })
                        }
                        value={info.phone}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Mật khẩu"
                        onChange={(e) =>
                            setInfo({ ...info, password: e.target.value })
                        }
                        value={info.password}
                    />
                </div>
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPass}
                            onChange={handleShowPass}
                            id="showPass"
                        />{' '}
                        Hiện mật khẩu
                    </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" /> Duy trì đăng nhập
                    </label>
                </div>
                <div className="d-grid gap-2 mb-2">
                    <input
                        id="login-btn"
                        type="submit"
                        value="LOGIN"
                        className="btn btn-success"
                    />
                    <input
                        id="forgot-btn"
                        type="button"
                        value="QUÊN MẬT KHẨU"
                        className="btn"
                        onClick={() => handleChangePage(2)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleChangePage(3)}
                >
                    Chưa có tài khoản? Đăng ký ngay
                </button>
            </div>
        </form>
    );
}

export default LoginForm;
