import Repository from '../../apis/RepositoryApi';
import { ReturnResponse } from '../../apis/Response';
import {
    ICreateAddressBody,
    IDeleteAddressApi,
    IUpdateAddressBody,
} from '../../Slice/Address/type';
import { routeAddress } from './route.api';

export const getAllAddressApi = async (): Promise<ReturnResponse<any>> => {
    return await Repository(routeAddress['getAllAddress']);
};

export const createNewAddressApi = async (
    payload: ICreateAddressBody
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAddress['createAddress'], payload);
};

export const updateAddressApi = async (
    payload: IUpdateAddressBody
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAddress['updateAddress'], payload);
};

export const deleteAddressApi = async (
    payload: IDeleteAddressApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAddress['deleteAddress'], payload);
};
