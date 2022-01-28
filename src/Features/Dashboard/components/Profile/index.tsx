import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import addressApi from '../../../../apis/Apis/addressApi';
import authApi from '../../../../apis/Apis/authApi';
import { IUpdateUserBody } from '../../../../apis/body/authBody';
import { ButtonSpinner, ContentWrapper } from '../../../../components';
import { ColorLabel } from '../../../../components/PinkLabel';
import storage from '../../../../firebase';
import defaultAvatar from '../../../../images/Logo128.png';
import { selectAddressList } from '../../../../Slice/Address/selector';
import { getAllAddressAsync } from '../../../../Slice/Address/thunk';
import { DEFAULT_AVATAR } from '../../../../static/DefaultAvatar';
import { notifyError, notifySuccess } from '../../../../utils/notify';
import { EditSchema } from '../../../../validates';
import { FormTitle } from '../../../Home/components';
import './style.scss';

interface ProfileProps {
    displayName: string | undefined;
    phone: string | undefined;
    avatar: string | undefined;
    address: string | undefined;
    code: string | undefined;
}

export const Profile = (props: ProfileProps) => {
    const { displayName, phone, avatar, address, code } = props;
    const [editAvatar, setEditAvatar] = React.useState(false);
    const avatarInput = React.useRef<any>(null);
    const dispatch = useDispatch();
    const listAddress = useSelector(selectAddressList);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        control,
        setValue,
    } = useForm({
        resolver: yupResolver(EditSchema),
    });

    React.useEffect(() => {
        setValue('displayName', displayName);
        setValue('phone', phone);
        setValue('avatar', avatar);
        setValue('address', address);
        setValue('code', code);
    }, [setValue, displayName, phone, avatar, address, code]);

    React.useEffect(() => {
        dispatch(getAllAddressAsync());
    }, []);

    const options =
        listAddress?.map((e: any) => ({
            value: e.code,
            label: `${e.address} (${
                e.key === 'PTN' ? 'Nội thành' : 'Ngoại thành'
            })`,
        })) || [];

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
            const reader = new FileReader();
            reader.onload = function (e: any) {
                setEditAvatar(true);
                document
                    .getElementById('user-avatar')!
                    .setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(avatarInput.current.files[0]);
        }
    };

    const uploadAvatar = () => {
        const storageRef = ref(
            storage,
            'images/' + avatarInput.current.files[0].name
        );
        const uploadTask = uploadBytesResumable(
            storageRef,
            avatarInput.current.files[0]
        );
        uploadTask.on(
            'state_changed',
            (snapshot: any) => {
                console.log(snapshot);
            },
            (error: any) => {
                console.log(error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL: string) => {
                        setTimeout(async () => {
                            const body: IUpdateUserBody = {
                                displayName: displayName,
                                phone: phone,
                                address: address,
                                avatar: downloadURL,
                                code: code,
                            };
                            const res: any = await authApi.updateUser(body);
                            if (res.data) {
                                notifySuccess(
                                    'Cập nhật ảnh đại diện thành công'
                                );
                                setEditAvatar(false);
                            } else {
                                notifyError('Cập nhật ảnh đại diện thất bại');
                            }
                        }, 1000);
                    }
                );
            }
        );
    };

    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        return new Promise((resolve) => {
            setTimeout(async () => {
                const body: IUpdateUserBody = {
                    displayName: data.displayName,
                    phone: data.phone,
                    address: data.address,
                    avatar: DEFAULT_AVATAR,
                    code: data.code,
                };
                const res: any = await authApi.updateUser(body);
                if (res.data) {
                    notifySuccess('Cập nhật thành công');
                } else {
                    notifyError('Cập nhật thất bại');
                }
                resolve(true);
            }, 2000);
        });
    };

    return (
        <ContentWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormTitle title="THÔNG TIN CÁ NHÂN" center />
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
                                accept=".jpg,.png,.jpeg"
                                ref={avatarInput}
                                onChange={showNewAvatar}
                                hidden
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={onAvatarClick}
                        >
                            Chọn ảnh đại diện
                        </button>
                        {editAvatar && (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={uploadAvatar}
                            >
                                {!isSubmitting ? 'Lưu ảnh' : <ButtonSpinner />}
                            </button>
                        )}
                        <p>* Nên chọn ảnh vuông để hiển thị tốt hơn</p>
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
                                        value={options.find(
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
                        <button
                            type="submit"
                            className="btn btn-success me-3"
                            disabled={!isDirty}
                        >
                            {!isSubmitting ? (
                                'Lưu thông tin'
                            ) : (
                                <ButtonSpinner />
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </ContentWrapper>
    );
};
