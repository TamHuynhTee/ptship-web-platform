import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    name: yup.string().required('Chưa nhập tên'),
    password: yup
        .string()
        .required('Chưa nhập mật khẩu')
        .min(6, 'Mật khẩu ít nhất 6 ký tự')
        .max(16, 'Mật khẩu nhiều nhất 16 ký tự'),
    confirmPassword: yup
        .string()
        .required('Chưa xác nhận mật khẩu')
        .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
});

export const SignInSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    password: yup
        .string()
        .required('Chưa nhập mật khẩu')
        .min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export const ChangePassSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required('Chưa nhập mật khẩu')
        .min(6, 'Mật khẩu ít nhất 6 ký tự'),
    newPassword: yup
        .string()
        .required('Chưa nhập mật khẩu mới')
        .min(6, 'Mật khẩu ít nhất 6 ký tự'),
    confirmNewPassword: yup
        .string()
        .required('Chưa xác nhận mật khẩu')
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải giống nhau'),
});

export const EditSchema = yup.object().shape({
    displayName: yup.string().required('Chưa nhập tên'),
    address: yup.string(),
    phone: yup
        .string()
        .required('Chưa nhập số điện thoại')
        .matches(
            /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ'
        ),
    avatar: yup.string(),
    code: yup.string(),
});

export const NewAddressSchema = yup.object().shape({
    key: yup.string().required('Chưa chọn vùng'),
    address: yup.string().required('Chưa nhập khu vực'),
});
