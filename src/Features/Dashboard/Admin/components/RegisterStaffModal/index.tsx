import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
    ButtonSpinner,
    CustomModal,
    ModalProps,
} from '../../../../../components';
import { ColorLabel } from '../../../../../components/PinkLabel';
import { getAllStaffAsync } from '../../../../../Slice/Staff/thunk';
import { registerStaffApi } from '../../../../../SliceApis/Auth/auth.api';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { NewStaffSchema } from '../../../../../validates';

export const RegisterStaffModal = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { onClose } = props;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(NewStaffSchema),
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                delete data.confirmPassword;
                const res: any = await registerStaffApi(data);
                console.log(res);
                if (res.data) {
                    notifySuccess('Đã tạo nhân viên mới');
                    dispatch(getAllStaffAsync({ skip: 1, limit: 20 }));
                    onClose();
                } else {
                    notifyError('Có lỗi xảy ra, vui lòng thử lại');
                }
                resolve(true);
            }, 2000);
        });
    };

    return (
        <CustomModal onClose={onClose} title="Tạo nhân viên">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <ColorLabel title="Số điện thoại" for="phone" />
                    <input
                        type="text"
                        className="form-control"
                        {...register('phone')}
                        id="phone"
                        placeholder="Điện thoại"
                    />
                    <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel title="Tên của bạn" for="displayName" />
                    <input
                        type="text"
                        className="form-control"
                        {...register('displayName')}
                        id="displayName"
                        placeholder="Tên của bạn"
                    />
                    <p className="text-danger">{errors.displayName?.message}</p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel title="Giá ship nhận" for="priceShipReceived" />
                    <input
                        type="text"
                        className="form-control"
                        {...register('priceShipReceived')}
                        id="priceShipReceived"
                        placeholder="Ship nhận"
                    />
                    <p className="text-danger">
                        {errors.priceShipReceived?.message}
                    </p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel
                        title="Giá ship giao (Ngoại thành)"
                        for="priceShipPTH"
                    />
                    <input
                        type="text"
                        className="form-control"
                        {...register('priceShipPTH')}
                        id="priceShipPTH"
                        placeholder="Giao ngoại thành"
                    />
                    <p className="text-danger">
                        {errors.priceShipPTH?.message}
                    </p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel
                        title="Giá ship giao (Nội thành)"
                        for="priceShipPTN"
                    />
                    <input
                        type="text"
                        className="form-control"
                        {...register('priceShipPTN')}
                        id="priceShipPTN"
                        placeholder="Giao nội thành"
                    />
                    <p className="text-danger">
                        {errors.priceShipPTN?.message}
                    </p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel title="Mật khẩu" for="password" />
                    <input
                        type="password"
                        className="form-control"
                        {...register('password')}
                        id="password"
                        placeholder="Mật khẩu"
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel
                        title="Xác nhận mật khẩu"
                        for="confirmPassword"
                    />
                    <input
                        type="password"
                        className="form-control"
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                    />
                    <p className="text-danger">
                        {errors.confirmPassword?.message}
                    </p>
                </div>
                <button className="btn btn-success">
                    {isSubmitting ? <ButtonSpinner /> : 'Tạo nhân viên'}
                </button>
            </form>
        </CustomModal>
    );
};
