import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateTypes } from './type';
import { getAllUserAsync } from './thunk';
import { notifyError } from '../../utils/notify';

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
            if (action.payload.list.length > 0)
                if (!action.payload.skip) {
                    state.allUser = action.payload.list;
                } else {
                    const newList = [...(state.allUser || [])].concat(
                        action.payload.list
                    );
                    state.allUser = newList;
                }
            else {
                notifyError('Không còn dữ liệu');
            }
        },
        [getAllUserAsync.rejected.toString()]: (state) => {
            state.loading = false;
        },
    },
});

export const { getDetailUser } = userSlice.actions;
export default userSlice.reducer;
