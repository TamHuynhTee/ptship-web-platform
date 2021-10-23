import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import authApi from '../../../../apis/authApi';
import { SignInSchema } from '../../../../validates';
import { FormTitle } from '../FormTitle';
import './style.scss';

interface LoginFormProps {
    ChangePage: Function;
}

function LoginForm(props: LoginFormProps) {
    const [error, setError] = useState('');
    const [showPass, setShowPass] = React.useState(false);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(SignInSchema) });

    const submitHandler = (e: any) => {
        e.preventDefault();
    };

    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    const handleShowPass = (e: any) => {
        setShowPass(e.target.checked);
        const type = showPass ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(() => {
                const body = {
                    phone: data.phone,
                    password: data.password,
                };
                const response: any = authApi.login(body);
                response
                    .then((res: any) => {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token);
                            history.push('/dashboard');
                        } else {
                            setError('Số điện thoại hoặc mật khẩu sai');
                        }
                    })
                    .catch((err: any) => console.log(err));
                resolve(true);
            }, 1500);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form">
                <FormTitle title="ĐĂNG NHẬP" />
                {error !== '' && (
                    <div className="alert alert-danger">{error}</div>
                )}
                {/* input */}
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        {...register('phone')}
                        id="phone"
                        placeholder="Số điện thoại"
                    />
                    <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        {...register('password')}
                        id="password"
                        placeholder="Mật khẩu"
                    />
                    <p className="text-danger">{errors.password?.message}</p>
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
                    <button
                        id="login-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        {!isSubmitting ? (
                            'ĐĂNG NHẬP'
                        ) : (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                    </button>
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
