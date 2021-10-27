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
import { notifyError } from '../../../../utils/notify';

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
    const avatarInput = React.useRef<any>(null);
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

    const onAvatarClick = () => {
        avatarInput.current.click();
    };

    const showNewAvatar = async () => {
        const validImageTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/svg',
        ];
        if (!validImageTypes.includes(avatarInput.current.files[0].type)) {
            notifyError('File không phải hình ảnh');
        } else if (avatarInput.current.files && avatarInput.current.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e: any) {
                document
                    .getElementById('user-avatar')!
                    .setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(avatarInput.current.files[0]);
        }
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
        //             code: data.code,
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
                            <img
                                src={avatar || defaultAvatar}
                                id="user-avatar"
                            />
                            <input
                                type="file"
                                id="file"
                                ref={avatarInput}
                                onChange={showNewAvatar}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={onAvatarClick}
                        >
                            Đổi ảnh đại diện
                        </button>
                        <p>* Sau khi đổi nhớ bấm lưu để cập nhật</p>
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
