import {
    configureStore,
    StateFromReducersMapObject,
    DeepPartial,
    Action,
} from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';

const reducer = {};

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
