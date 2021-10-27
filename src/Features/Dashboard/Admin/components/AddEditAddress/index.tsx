import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import addressApi from '../../../../../apis/Apis/addressApi';
import {
    ICreateAddressBody,
    IUpdateAddressBody,
} from '../../../../../apis/body/addressBody';
import { ColorLabel } from '../../../../../components/PinkLabel';
import { notifyError, notifySuccess } from '../../../../../utils/notify';
import { NewAddressSchema } from '../../../../../validates';

interface AddEditAddressProps {
    isEdit?: boolean;
    data?: any;
    closeModal?: any;
}

export const AddEditAddress = (props: AddEditAddressProps) => {
    const { isEdit } = props;
    const [thisData, setThisData] = React.useState({
        zone: '',
        address: '',
    });
    const { id, zone, address } = props.data;
    console.log(thisData);

    React.useEffect(() => {
        setThisData({ zone: zone, address: address });
    }, [zone, address]);

    const options = [
        { value: 'PTN', label: 'Nội thành' },
        { value: 'PTH', label: 'Ngoại thành' },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(NewAddressSchema),
        defaultValues: {
            address: thisData.address,
            key: thisData.zone,
        },
    });

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return !isEdit
            ? new Promise((resolve) => {
                  setTimeout(async () => {
                      const body: ICreateAddressBody = {
                          address: data.address,
                          key: data.key,
                      };
                      const res: any = await addressApi.createAddress(body);
                      console.log(res);
                      if (res.data) {
                          reset();
                          notifySuccess('Đã tạo địa chỉ mới');
                      } else {
                          notifyError(
                              'Có lỗi xảy ra, có thể địa chỉ này đã tồn tại'
                          );
                      }
                      resolve(true);
                  }, 2000);
              })
            : new Promise((resolve) => {
                  setTimeout(async () => {
                      alert('yes');
                      const body: IUpdateAddressBody = {
                          id: id,
                          address: data.address,
                          key: data.key,
                      };
                      console.log(body);
                      resolve(true);
                  }, 2000);
              });
    };

    return (
        <div
            className="modal fade"
            id="createAddress"
            tabIndex={-1}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">
                            {!isEdit ? 'Thêm mới địa chỉ' : 'Chỉnh sửa địa chỉ'}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-2">
                                <ColorLabel title="Khu vực" for="address" />
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register('address')}
                                    id="address"
                                    placeholder="Khu vực"
                                />
                                <p className="text-danger">
                                    {errors.address?.message}
                                </p>
                            </div>
                            <div className="form-group mb-2">
                                <ColorLabel title="Vùng" for="key" />
                                <Controller
                                    control={control}
                                    name="key"
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            value,
                                            name,
                                        },
                                    }) => (
                                        <Select
                                            name={name}
                                            id="key"
                                            options={options}
                                            value={options?.find(
                                                (option: any) =>
                                                    option.value === value
                                            )}
                                            onChange={(val: any) =>
                                                onChange(val.value)
                                            }
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                                <p className="text-danger">
                                    {errors.key?.message}
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Hủy
                        </button>
                        {isEdit && (
                            <button type="button" className="btn btn-danger">
                                Xóa
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSubmit(onSubmit)}
                        >
                            {!isSubmitting ? (
                                isEdit ? (
                                    'Lưu'
                                ) : (
                                    'Tạo'
                                )
                            ) : (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
