import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateTypes } from './type';

const initialState: AuthStateTypes = {
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {},
});
export const {} = authSlice.actions;

export default authSlice.reducer;
// getDeadlineStudentAsync
