import axiosClient from './axiosClient';

class AuthApi {
    login = (body: any) => {
        const url = '/auth/login';
        return axiosClient.post(url, body);
    };
    register = (body: any) => {
        const url = '/auth/register';
        return axiosClient.post(url, body);
    };
    changePass = (body: any) => {
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
}
const authApi = new AuthApi();
export default authApi;
