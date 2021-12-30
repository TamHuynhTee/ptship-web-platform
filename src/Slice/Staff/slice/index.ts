import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaffStateTypes } from "../type";
import { getAllStaffAsync } from "./thunk";

const initialState: Partial<StaffStateTypes> = {
  status: "idle",
  staff: null,
  allStaff: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getDetailStaff: (state, action: PayloadAction<any>) => {
      state.staff = action.payload;
    },
  },
  extraReducers: {
    [getAllStaffAsync.pending.toString()]: (state) => {
      state.status = "loading";
    },
    [getAllStaffAsync.fulfilled.toString()]: (
      state,
      action: PayloadAction<any>
    ) => {
      state.status = "idle";
      state.allStaff = action.payload;
    },
    [getAllStaffAsync.rejected.toString()]: (state, action) => {
      state.status = "idle";
    },
  },
});

export const { getDetailStaff } = userSlice.actions;
export default userSlice.reducer;
