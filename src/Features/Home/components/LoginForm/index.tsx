import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ButtonSpinner } from '../../../../components';
import { loginAsync } from '../../../../Slice/Auth/thunk';
import { SignInSchema } from '../../../../validates';
import { FormTitle } from '../FormTitle';
import './style.scss';

interface LoginFormProps {
    ChangePage: Function;
}

function LoginForm(props: LoginFormProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(SignInSchema) });

    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    const handleShowPass = (e: any) => {
        const type = !e.target.checked ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const res: any = await dispatch(loginAsync(data));
                if (Object.values(res.payload).length)
                    history.push('/dashboard');
                resolve(true);
            }, 2000);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form">
                <FormTitle title="ĐĂNG NHẬP" />
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
                <div className="d-grid gap-2 mb-2">
                    <button
                        id="login-btn"
                        type="submit"
                        className="btn btn-success"
                    >
                        {!isSubmitting ? 'ĐĂNG NHẬP' : <ButtonSpinner />}
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
