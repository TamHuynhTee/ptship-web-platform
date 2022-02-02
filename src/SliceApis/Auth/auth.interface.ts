import { IParamGetAll } from '../../Models/auth.model';

export interface IReqRegisterStaff {
    phone: string;
    password: string;
    displayName: string;
    priceShipPTN: number;
    priceShipPTH: number;
    priceShipReceived: number;
}

export interface ILogin {
    phone: string;
    password: string;
}

export interface IParamGetAllStaff extends IParamGetAll {}
export interface IParamGetAllUser extends IParamGetAll {}

export interface IRegisterBody {
    phone: string;
    password: string;
    displayName: string;
}

export interface IUpdateUserBody {
    displayName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
    code?: string;
}

export interface IChangePasswordBody {
    oldPassword: string;
    newPassword: string;
}
