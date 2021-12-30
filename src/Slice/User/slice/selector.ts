import { RootState } from "../../../store/store";

export const selectUserDetail = (state: RootState) => state?.user?.user;
export const selectAllUser = (state: RootState) => state?.user?.allUser;
