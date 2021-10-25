import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import './style.scss';
import { Controller, useForm } from 'react-hook-form';
import { ContentWrapper } from '../../../../components';
import { EditSchema } from '../../../../validates';
import { FormTitle } from '../../../Home/components';
import defaultAvatar from '../../../../images/Logo128.png';
import Select from 'react-select';
import addressApi from '../../../../apis/Apis/addressApi';
import { ColorLabel } from '../../../../components/PinkLabel';
import Avatar from 'react-avatar-edit';
import { IUpdateUserBody } from '../../../../apis/body/authBody';
import authApi from '../../../../apis/Apis/authApi';

interface ProfileProps {
    displayName?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    code?: string;
}

export const Profile = (props: ProfileProps) => {
    const { displayName, phone, avatar, address, code } = props;
    const [options, setOptions] = React.useState([]);
    const [editAvatar, setEditAvatar] = React.useState(false);
    const [preview, setPreview] = React.useState(null);
    const refAvatar = React.useRef(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(EditSchema),
        defaultValues: {
            displayName: displayName,
            phone: phone,
            address: address,
            code: code,
            avatar: avatar,
        },
    });

    React.useEffect(() => {
        const getAddress = async () => {
            const res: any = await addressApi.getAllAddress();
            const newOptions = res.data.map((e: any) => ({
                value: e.code,
                label: `${e.address} (${
                    e.key === 'PTN' ? 'Nội thành' : 'Ngoại thành'
                })`,
            }));
            setOptions(newOptions);
        };
        getAddress();
    }, []);

    const onCrop = (newPreview: any) => {
        setPreview(newPreview);
    };

    const onClose = () => {
        setPreview(null);
    };

    const onBeforeFileLoad = (elem: any) => {
        if (elem.target.files[0].size > 71680) {
            alert('Ảnh quá lớn!');
            elem.target.value = '';
        }
    };

    const openEditAvatar = () => {
        setEditAvatar(!editAvatar);
        setPreview(null);
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        console.log(data);
        // return new Promise((resolve) => {
        //     setTimeout(async () => {
        //         const body: IUpdateUserBody = {
        //             displayName: data.displayName,
        //             phone: data.phone,
        //             address: data.address,
        //             avatar: data.avatar,
        //             code: data.code.value,
        //         };
        //         const res: any = await authApi.updateUser(body);
        //         console.log(res);
        //         resolve(true);
        //     }, 2000);
        // });
    };

    return (
        <ContentWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormTitle title="THÔNG TIN CÁ NHÂN" />
                <div className="d-flex profile">
                    <div className="profile-avatar d-flex flex-column align-items-center p-2">
                        <div className="avatar-container mb-3">
                            {preview ? (
                                <img src={preview} alt="Preview" />
                            ) : (
                                <img src={avatar || defaultAvatar} />
                            )}
                        </div>
                        <button
                            type="button"
                            className={`btn btn-${
                                !editAvatar ? 'primary' : 'secondary'
                            } ${editAvatar && ' mb-3'}`}
                            onClick={openEditAvatar}
                        >
                            {editAvatar ? 'Hủy' : 'Đổi ảnh đại diện'}
                        </button>
                        {editAvatar && (
                            <Avatar
                                // {...register('avatar')}
                                ref={refAvatar}
                                width={390}
                                height={295}
                                onCrop={onCrop}
                                onClose={onClose}
                                onBeforeFileLoad={onBeforeFileLoad}
                                src={avatar || defaultAvatar}
                            />
                        )}
                    </div>
                    <div className="profile-info p-2">
                        <div className="form-group mb-2">
                            <ColorLabel title="Tên của bạn" for="displayName" />
                            <input
                                type="text"
                                className="form-control"
                                {...register('displayName')}
                                id="displayName"
                                placeholder="Tên của bạn"
                            />
                            <p className="text-danger">
                                {errors.displayName?.message}
                            </p>
                        </div>
                        <div className="form-group mb-2">
                            <ColorLabel title="Số điện thoại" for="phone" />
                            <input
                                type="text"
                                className="form-control"
                                {...register('phone')}
                                id="phone"
                                placeholder="Số điện thoại"
                            />
                            <p className="text-danger">
                                {errors.phone?.message}
                            </p>
                        </div>
                        <div className="form-group mb-2">
                            <ColorLabel title="Địa chỉ" for="address" />
                            <input
                                type="text"
                                className="form-control"
                                {...register('address')}
                                id="address"
                                placeholder="Địa chỉ"
                            />
                            <p className="text-danger">
                                {errors.address?.message}
                            </p>
                        </div>
                        <div className="form-group mb-2">
                            <ColorLabel title="Khu vực" for="code" />
                            <Controller
                                control={control}
                                name="code"
                                render={({
                                    field: { onChange, onBlur, value, name },
                                }) => (
                                    <Select
                                        name={name}
                                        id="code"
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
                                {errors.code?.message}
                            </p>
                        </div>
                        <button type="submit" className="btn btn-success me-3">
                            {!isSubmitting ? (
                                'Lưu thông tin'
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
                    </div>
                </div>
            </form>
        </ContentWrapper>
    );
};
