import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../utils/notify';
import { getCurrentUserAsync, loginAsync } from './thunk';
import { AuthStateTypes } from './type';

const initialState: AuthStateTypes = {
    loading: false,
    currentUser: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<any>) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: {
        [loginAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [loginAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            if (Object.keys(action.payload).length === 0) {
                notifyError('Thông tin đăng nhập sai');
            } else {
                notifySuccess('Đăng nhập thành công');
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', action.payload.role);
            }
        },
        [loginAsync.rejected.toString()]: (state, action) => {
            state.loading = false;
        },
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
export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
// getDeadlineStudentAsync
