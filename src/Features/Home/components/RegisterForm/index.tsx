import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '../../../../validates';
import authApi from '../../../../apis/Apis/authApi';
import { notifySuccess } from '../../../../utils/notify';
import { FormTitle } from '../FormTitle';
import { IRegisterBody } from '../../../../apis/body/authBody';

interface RegisterFormProps {
    ChangePage: Function;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const [error, setError] = React.useState('');
    const [showPass, setShowPass] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(SignUpSchema) });
    const handleShowPass = (e: any) => {
        setShowPass(e.target.checked);
        const type = showPass ? 'password' : 'text';
        document.getElementById('password')?.setAttribute('type', type);
        document.getElementById('confirmPassword')?.setAttribute('type', type);
    };

    const handleChangePage = (page: number) => {
        props.ChangePage(page);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(() => {
                const body: IRegisterBody = {
                    phone: data.phone,
                    password: data.password,
                    displayName: data.name,
                };
                const response: any = authApi.register(body);
                response
                    .then((res: any) => {
                        if (!res.data) setError('Số điện thoại đã tồn tại');
                        else {
                            reset();
                            setError('');
                            props.ChangePage(1);
                            notifySuccess('Tạo tài khoản thành công');
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
                <FormTitle title="TÀI KHOẢN MỚI" />
                {error !== '' && (
                    <div className="alert alert-danger">{error}</div>
                )}
                {/* input */}
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('phone')}
                        id="phone"
                        placeholder="0908xxxxxx ..."
                    />
                    <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Tên của bạn
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        {...register('name')}
                        id="name"
                        placeholder="Nguyễn Văn A ..."
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        {...register('password')}
                        id="password"
                        placeholder="Mật khẩu"
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                        Nhập lại mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <p className="text-danger">
                        {errors.confirmPassword?.message}
                    </p>
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
                <div className="d-grid gap-2">
                    <button
                        type="submit"
                        className="btn btn-success"
                        id="login-btn"
                    >
                        {isSubmitting ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            'ĐĂNG KÝ'
                        )}
                    </button>
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
};
