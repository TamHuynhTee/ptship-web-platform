import Repository from '../../apis/RepositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../apis/Response';
import { currentUserModel } from '../../Models/auth.model';
import {
    ILogin,
    IReqRegisterStaff,
    IParamGetAllStaff,
    IParamGetAllUser,
    IRegisterBody,
    IUpdateUserBody,
    IChangePasswordBody,
} from './auth.interface';
import { routeAuth } from './route.api';

export const loginApi = async (login: ILogin) => {
    return await Repository(routeAuth['login'], login);
};

export const getUserApi = async (): Promise<
    ReturnResponse<currentUserModel>
> => {
    return await Repository(routeAuth['getUser']);
};

export const getAllStaffApi = async (
    params: IParamGetAllStaff
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeAuth['getAllStaff'], params);
};

export const getAllUserApi = async (
    params: IParamGetAllUser
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeAuth['getAllUser'], params);
};

export const registerApi = async (
    params: IRegisterBody
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeAuth['register'], params);
};
export const changePassApi = async (
    params: IChangePasswordBody
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeAuth['changePass'], params);
};
export const updateUserApi = async (
    params: IUpdateUserBody
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeAuth['updateUser'], params);
};

export const registerStaffApi = async (payload: IReqRegisterStaff) => {
    return await Repository(routeAuth['registerStaff'], payload);
};
