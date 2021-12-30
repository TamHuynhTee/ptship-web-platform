import { RootState } from "../../../store/store";

export const selectStaffDetail = (state: RootState) => state?.staff?.staff;
export const selectAllStaff = (state: RootState) => state?.staff?.allStaff;
