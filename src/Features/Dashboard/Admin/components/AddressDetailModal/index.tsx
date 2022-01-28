import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
    ButtonSpinner,
    CustomModal,
    ModalProps,
} from '../../../../../components';
import { ColorLabel } from '../../../../../components/PinkLabel';
import { selectAddressDetail } from '../../../../../Slice/Address/selector';
import { getAllAddressAsync } from '../../../../../Slice/Address/thunk';
import { updateAddressApi } from '../../../../../SliceApis/Address/address.api';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { NewAddressSchema } from '../../../../../validates';

export const AddressDetailModal = (props: ModalProps) => {
    const dispatch = useDispatch();
    const { onClose } = props;
    const options = [
        { value: 'PTN', label: 'Nội thành' },
        { value: 'PTH', label: 'Ngoại thành' },
    ];
    const address = useSelector(selectAddressDetail);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm({
        resolver: yupResolver(NewAddressSchema),
        defaultValues: {
            address: address?.address,
            key: address?.key,
        },
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const res: any = await updateAddressApi({
                    id: address?._id || '',
                    address: data.address,
                    key: data.key,
                });
                if (res.data) {
                    dispatch(getAllAddressAsync());
                    notifySuccess('Đã cập nhật địa chỉ');
                    onClose();
                } else {
                    notifyError('Có lỗi xảy ra');
                }
                resolve(true);
            }, 2000);
        });
    };

    return (
        <CustomModal onClose={onClose} title="Chỉnh sửa địa chỉ">
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
                    {isSubmitting ? <ButtonSpinner /> : 'Lưu'}
                </button>
            </form>
        </CustomModal>
    );
};
