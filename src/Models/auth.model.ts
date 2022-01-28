import { addressModel } from './address.model';

export interface currentUserModel {
    readonly _id: string;
    address: string;
    area: addressModel;
    atm: string;
    avatar: string;
    nameAtm: string;
    displayName: string;
    fcm: string;
    phone: string;
    priceShipPTH: number;
    priceShipPTN: number;
    priceShipReceived: number;
    role: number;
    userName: string;
    createdAt: string;
    updatedAt: string;
}
