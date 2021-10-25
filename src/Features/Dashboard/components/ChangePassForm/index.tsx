import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import authApi from '../../../../apis/Apis/authApi';
import { IChangePasswordBody } from '../../../../apis/body/authBody';
import { ContentWrapper } from '../../../../components';
import { ColorLabel } from '../../../../components/PinkLabel';
import { notifySuccess } from '../../../../utils/notify';
import { ChangePassSchema } from '../../../../validates';
import { FormTitle } from '../../../Home/components';

interface ChangePassFormProps {}

export const ChangePassForm = (props: ChangePassFormProps) => {
    const [error, setError] = React.useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(ChangePassSchema),
    });

    const handleShowPass = (e: any) => {
        const type = !e.target.checked ? 'password' : 'text';
        document.getElementById('currentPassword')?.setAttribute('type', type);
        document.getElementById('newPassword')?.setAttribute('type', type);
        document
            .getElementById('confirmNewPassword')
            ?.setAttribute('type', type);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        setError('');
        return new Promise((resolve) => {
            setTimeout(async () => {
                const body: IChangePasswordBody = {
                    oldPassword: data.currentPassword,
                    newPassword: data.newPassword,
                };
                const response: any = await authApi.changePass(body);
                if (!response.data) setError('Sai mật khẩu hiện tại');
                else {
                    notifySuccess('Đổi mật khẩu thành công');
                    reset();
                }
                resolve(true);
            }, 2000);
        });
    };

    return (
        <ContentWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormTitle title="ĐỔI MẬT KHẨU" />
                {error !== '' && (
                    <div className="alert alert-danger">{error}</div>
                )}
                <div className="form-group mb-2">
                    <ColorLabel
                        title="Nhập mật khẩu hiện tại"
                        for="currentPassword"
                    />
                    <input
                        type="password"
                        className="form-control"
                        {...register('currentPassword')}
                        id="currentPassword"
                        placeholder="Mật khẩu"
                    />
                    <p className="text-danger">
                        {errors.currentPassword?.message}
                    </p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel title="Nhập mật khẩu mới" for="newPassword" />
                    <input
                        type="password"
                        className="form-control"
                        {...register('newPassword')}
                        id="newPassword"
                        placeholder="Mật khẩu mới"
                    />
                    <p className="text-danger">{errors.newPassword?.message}</p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel
                        title="Xác nhận mật khẩu mới"
                        for="confirmNewPassword"
                    />
                    <input
                        type="password"
                        className="form-control"
                        {...register('confirmNewPassword')}
                        id="confirmNewPassword"
                        placeholder="Xác nhận mật khẩu mới"
                    />
                    <p className="text-danger">
                        {errors.confirmNewPassword?.message}
                    </p>
                </div>
                <div className="checkbox mb-2">
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleShowPass}
                            id="showPass"
                        />{' '}
                        Hiện mật khẩu
                    </label>
                </div>
                <button type="submit" className="btn btn-success me-2">
                    {!isSubmitting ? (
                        'Đổi mật khẩu'
                    ) : (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => reset()}
                >
                    <i className="bi bi-arrow-repeat"></i> Reset
                </button>
            </form>
        </ContentWrapper>
    );
};
