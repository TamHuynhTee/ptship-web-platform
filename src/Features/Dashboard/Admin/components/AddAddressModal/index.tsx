import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { ICreateAddressBody } from '../../../../../apis/body/addressBody';
import {
    ButtonSpinner,
    CustomModal,
    ModalProps,
} from '../../../../../components';
import { ColorLabel } from '../../../../../components/PinkLabel';
import { getAllAddressAsync } from '../../../../../Slice/Address/thunk';
import { createNewAddressApi } from '../../../../../SliceApis/Address/address.api';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { NewAddressSchema } from '../../../../../validates';

export const AddAddressModal = (props: ModalProps) => {
    const { onClose } = props;
    const dispatch = useDispatch();
    const options = [
        { value: 'PTN', label: 'Nội thành' },
        { value: 'PTH', label: 'Ngoại thành' },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        resolver: yupResolver(NewAddressSchema),
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const body: ICreateAddressBody = {
                    address: data.address,
                    key: data.key,
                };
                const res: any = await createNewAddressApi(body);
                if (res.data) {
                    dispatch(getAllAddressAsync());
                    notifySuccess('Đã tạo địa chỉ mới');
                    onClose();
                } else {
                    notifyError('Có lỗi xảy ra, có thể địa chỉ này đã tồn tại');
                }
                resolve(true);
            }, 2000);
        });
    };

    return (
        <CustomModal onClose={onClose} title="Tạo địa chỉ mới">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <ColorLabel title="Khu vực" for="address" />
                    <input
                        type="text"
                        className="form-control"
                        {...register('address')}
                        id="address"
                        placeholder="Khu vực"
                    />
                    <p className="text-danger">{errors.address?.message}</p>
                </div>
                <div className="form-group mb-2">
                    <ColorLabel title="Vùng" for="key" />
                    <Controller
                        control={control}
                        name="key"
                        render={({
                            field: { onChange, onBlur, value, name },
                        }) => (
                            <Select
                                name={name}
                                id="key"
                                options={options}
                                value={options?.find(
                                    (option: any) => option.value === value
                                )}
                                onChange={(val: any) => onChange(val.value)}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <p className="text-danger">{errors.key?.message}</p>
                </div>
                <button className="btn btn-success">
                    {isSubmitting ? <ButtonSpinner /> : 'Tạo'}
                </button>
            </form>
        </CustomModal>
    );
};
