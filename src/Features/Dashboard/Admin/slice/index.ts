import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AdminStateTypes } from '../type';

const initialState: AdminStateTypes = {
    loading: false,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: {},
});
export const {} = adminSlice.actions;

export default adminSlice.reducer;
// getDeadlineStudentAsync
