import { addressModel } from '../../Models/address.model';

export interface AddressStateTypes {
    loading?: boolean;
    addressList?: Array<addressModel>;
    addressDetail?: addressModel;
}

export interface ICreateAddressBody {
    key: string;
    address: string;
}

export interface IUpdateAddressBody {
    id: string;
    key?: string;
    address?: string;
}

export interface IDeleteAddressApi {
    addressId: string;
}
