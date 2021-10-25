import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import authApi from '../../../../apis/Apis/authApi';
import { ILoginBody } from '../../../../apis/body/authBody';
import { notifySuccess } from '../../../../utils/notify';
import { SignInSchema } from '../../../../validates';
import { FormTitle } from '../FormTitle';
import './style.scss';

interface LoginFormProps {
    ChangePage: Function;
}

function LoginForm(props: LoginFormProps) {
    const [error, setError] = useState('');
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(SignInSchema) });

    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    const handleShowPass = (e: any) => {
        const type = e.target.checked ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const body: ILoginBody = {
                    phone: data.phone,
                    password: data.password,
                };
                const response: any = await authApi.login(body);
                if (Object.keys(response.data).length === 0) {
                    setError(
                        response.message === 'Invalid password !!'
                            ? 'Sai mật khẩu'
                            : 'Không tìm thấy số điện thoại'
                    );
                    resolve(true);
                    return;
                }
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                history.push('/dashboard');
                notifySuccess('Đăng nhập thành công');
                resolve(true);
            }, 2000);
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
                            onChange={handleShowPass}
                            id="showPass"
                        />{' '}
                        Hiện mật khẩu
                    </label>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" {...register('remembered')} />{' '}
                        Duy trì đăng nhập
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
