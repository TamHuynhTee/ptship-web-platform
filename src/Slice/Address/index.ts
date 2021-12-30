import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllAddressAsync } from './thunk';
import { AddressStateTypes } from './type';

const initialState: AddressStateTypes = {
    loading: false,
    addressDetail: null,
    addressList: [],
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllAddressAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getAllAddressAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.addressList = action.payload;
            state.loading = false;
        },
        [getAllAddressAsync.rejected.toString()]: (state) => {
            state.loading = false;
        },
    },
});
export const {} = addressSlice.actions;

export default addressSlice.reducer;
// getDeadlineStudentAsync
