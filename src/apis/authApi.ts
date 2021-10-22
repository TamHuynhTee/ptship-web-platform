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
}
const authApi = new AuthApi();
export default authApi;
