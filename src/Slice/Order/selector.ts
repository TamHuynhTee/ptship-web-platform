import { RootState } from '../../store/store';
export const selectStatistic = (state: RootState) => state?.order.statistic;
export const selectOrderLoading = (state: RootState) => state?.order.loading;
