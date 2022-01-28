import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateTypes } from './type';
import { getAllUserAsync } from './thunk';

const initialState: Partial<UserStateTypes> = {
    loading: false,
    user: undefined,
    allUser: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getDetailUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
    extraReducers: {
        [getAllUserAsync.pending.toString()]: (state) => {
            state.loading = true;
        },
        [getAllUserAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false;
            state.allUser = action.payload;
        },
        [getAllUserAsync.rejected.toString()]: (state, action) => {
            state.loading = false;
        },
    },
});

export const { getDetailUser } = userSlice.actions;
export default userSlice.reducer;
