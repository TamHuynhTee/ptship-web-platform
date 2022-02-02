import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderStatisticsAsync } from './thunk';
import { OrderStateTypes } from './type';

const initialState: OrderStateTypes = {
    loading: false,
    statistic: undefined,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [getOrderStatisticsAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getOrderStatisticsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            console.log(action.payload);
            state.loading = false;
            state.statistic = action.payload;
        },
        [getOrderStatisticsAsync.rejected.toString()]: (state, action) => {
            state.loading = false;
        },
    },
});
export const {} = orderSlice.actions;

export default orderSlice.reducer;
