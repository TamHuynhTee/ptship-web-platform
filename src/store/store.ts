import {
    configureStore,
    StateFromReducersMapObject,
    DeepPartial,
    Action,
} from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import addressSlice from '../Slice/Address';
import userSlice from '../Slice/User';
import staffSlice from '../Slice/Staff';
import authSlice from '../Slice/Auth';

const reducer = {
    address: addressSlice,
    user: userSlice,
    staff: staffSlice,
    auth: authSlice,
};

export type IRootState = StateFromReducersMapObject<typeof reducer>;

function initConfigStore(preloadedState?: DeepPartial<IRootState>) {
    return configureStore({
        reducer,
        preloadedState: preloadedState,
        middleware: [thunk],
    });
}

export const store = initConfigStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
