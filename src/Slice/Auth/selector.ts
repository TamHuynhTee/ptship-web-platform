import { RootState } from '../../store/store';
export const selectCurrentUser = (state: RootState) => state?.auth?.currentUser;
export const selectAuthLoading = (state: RootState) => state?.auth?.loading;
