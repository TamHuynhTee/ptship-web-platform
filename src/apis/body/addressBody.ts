export interface ICreateAddressBody {
    key: string;
    address: string;
}

export interface IUpdateAddressBody {
    id: string;
    key?: string;
    address?: string;
}
