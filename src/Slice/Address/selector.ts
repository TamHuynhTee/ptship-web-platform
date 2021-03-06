import { RootState } from '../../store/store';

export const selectAddressLoading = (state: RootState) =>
    state?.address.loading;
export const selectAddressList = (state: RootState) =>
    state?.address.addressList;
