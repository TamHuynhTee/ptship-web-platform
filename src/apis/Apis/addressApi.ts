import axiosClient from '../axiosClient';
import { ICreateAddressBody, IUpdateAddressBody } from '../body/addressBody';

class AddressApi {
    getAllAddress = () => {
        const url = 'address/getAllAddress';
        return axiosClient.get(url);
    };
    createAddress = (body: ICreateAddressBody) => {
        const url = 'address/createAddress';
        return axiosClient.post(url, body);
    };
    updateAddress = (body: IUpdateAddressBody) => {
        const url = 'address/updateAddress';
        return axiosClient.post(url, body);
    };
    deleteAddress = (params: any) => {
        const url = 'address/deleteAddress';
        return axiosClient.post(url, { params });
    };
}
const addressApi = new AddressApi();
export default addressApi;
