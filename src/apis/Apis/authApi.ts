import axiosClient from '../axiosClient';
import {
    IChangePasswordBody,
    ILoginBody,
    IRegisterBody,
} from '../body/authBody';

class AuthApi {
    login = (body: ILoginBody) => {
        const url = '/auth/login';
        return axiosClient.post(url, body);
    };
    register = (body: IRegisterBody) => {
        const url = '/auth/register';
        return axiosClient.post(url, body);
    };
    changePass = (body: IChangePasswordBody) => {
        const url = '/auth/changePassword';
        return axiosClient.post(url, body);
    };
    updateUser = (body: any) => {
        const url = '/auth/updateUser';
        return axiosClient.post(url, body);
    };
    getAllUser = (params: any) => {
        const url = '/auth/findAllUser';
        return axiosClient.get(url, { params });
    };
    getUser = () => {
        const url = '/auth/findUser';
        return axiosClient.get(url);
    };
}
const authApi = new AuthApi();
export default authApi;
