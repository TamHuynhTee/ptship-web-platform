import Repository from '../../apis/RepositoryApi';
import { ReturnResponse } from '../../apis/Response';
import { currentUserModel } from '../../Models/auth.model';
import { ILogin, IReqRegisterStaff } from './auth.interface';
import { routeAuth } from './route.api';

export const loginApi = async (login: ILogin) => {
    return await Repository(routeAuth['login'], login);
};

export const getUserApi = async (): Promise<
    ReturnResponse<currentUserModel>
> => {
    return await Repository(routeAuth['getUser']);
};

export const registerStaffApi = async (payload: IReqRegisterStaff) => {
    return await Repository(routeAuth['registerStaff'], payload);
};
