import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUserAsync } from './thunk';
import { AuthStateTypes } from './type';

const initialState: AuthStateTypes = {
    loading: false,
    currentUser: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [getCurrentUserAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getCurrentUserAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        [getCurrentUserAsync.rejected.toString()]: (state, action) => {
            state.loading = false;
        },
    },
});
export const {} = authSlice.actions;

export default authSlice.reducer;
// getDeadlineStudentAsync
