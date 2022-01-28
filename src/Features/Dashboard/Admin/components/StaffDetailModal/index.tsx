import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    ButtonSpinner,
    CustomModal,
    ModalProps,
} from '../../../../../components';
import InputMoney from '../../../../../components/InputMoney';
import { ColorLabel } from '../../../../../components/PinkLabel';
import { selectStaffDetail } from '../../../../../Slice/Staff/selector';
import { EditStaffSchema } from '../../../../../validates';

export const StaffDetailModal = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { onClose } = props;
    const staff = useSelector(selectStaffDetail);
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        clearErrors,
    } = useForm({
        resolver: yupResolver(EditStaffSchema),
    });

    React.useEffect(() => {
        if (staff) {
            setValue('priceShipReceived', staff.priceShipReceived);
            setValue('priceShipPTH', staff.priceShipPTH);
            setValue('priceShipPTN', staff.priceShipPTN);
        }
    }, [setValue, staff]);

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
        // return new Promise((resolve) => {
        //     setTimeout(async () => {
        //         const res: any = await updateAddressApi({
        //             id: address?._id,
        //             address: data.address,
        //             key: data.key,
        //         });
        //         if (res.data) {
        //             dispatch(getAllAddressAsync());
        //             notifySuccess('Đã cập nhật địa chỉ');
        //             onClose();
        //         } else {
        //             notifyError('Có lỗi xảy ra');
        //         }
        //         resolve(true);
        //     }, 2000);
        // });
    };

    return (
        <CustomModal onClose={onClose} title="Đặt giá ship">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <ColorLabel title="Giá ship nhận" for="priceShipReceived" />
                    <InputMoney
                        name="priceShipReceived"
                        placeholder="Ship nhận"
                        setValue={setValue}
                        clearError={clearErrors}
                        defaultValue={staff?.priceShipReceived}
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
                    <InputMoney
                        name="priceShipPTH"
                        placeholder="Giao ngoại thành"
                        setValue={setValue}
                        clearError={clearErrors}
                        defaultValue={staff?.priceShipPTH}
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
                    <InputMoney
                        name="priceShipPTN"
                        placeholder="Giao nội thành"
                        setValue={setValue}
                        clearError={clearErrors}
                        defaultValue={staff?.priceShipPTN}
                    />
                    <p className="text-danger">
                        {errors.priceShipPTN?.message}
                    </p>
                </div>
                <button className="btn btn-success">
                    {isSubmitting ? <ButtonSpinner /> : 'Lưu'}
                </button>
            </form>
        </CustomModal>
    );
};
