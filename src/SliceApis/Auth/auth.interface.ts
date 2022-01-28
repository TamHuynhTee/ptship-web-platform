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
