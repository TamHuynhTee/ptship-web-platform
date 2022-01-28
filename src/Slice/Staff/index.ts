import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffStateTypes } from './type';
import { getAllStaffAsync } from './thunk';

const initialState: Partial<StaffStateTypes> = {
    loading: false,
    staff: undefined,
    allStaff: [],
};

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        getDetailStaff: (state, action: PayloadAction<any>) => {
            state.staff = action.payload;
        },
    },
    extraReducers: {
        [getAllStaffAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getAllStaffAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.allStaff = action.payload;
        },
        [getAllStaffAsync.rejected.toString()]: (state, action) => {
            state.loading = false;
        },
    },
});

export const { getDetailStaff } = staffSlice.actions;
export default staffSlice.reducer;
