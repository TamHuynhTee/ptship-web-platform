export interface AddressStateTypes {
    loading?: boolean;
    addressList?: Array<any>;
    addressDetail?: any;
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
