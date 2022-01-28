import { addressModel } from './address.model';

export interface staffModel {
    readonly _id: string;
    userName: string;
    address: string;
    area: addressModel;
    atm: string;
    nameAtm: string;
    fcm: string;
    avatar: string;
    displayName: string;
    phone: string;
    priceShipReceived: number;
    priceShipPTN: number;
    priceShipPTH: number;
    role: number;
    createdAt: string;
    updatedAt: string;
}
