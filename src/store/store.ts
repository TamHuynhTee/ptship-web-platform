import {
  configureStore,
  StateFromReducersMapObject,
  DeepPartial,
  Action,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";
import addressSlice from "../Slice/Address";
import userSlice from "../Slice/User/slice";
import staffSlice from "../Slice/Staff/slice";

const reducer = {
  address: addressSlice,
  user: userSlice,
  staff: staffSlice,
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
