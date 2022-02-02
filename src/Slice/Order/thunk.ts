import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderStatisticsApi } from '../../SliceApis/Order/order.api';
import { IStatisticOrder } from '../../SliceApis/Order/order.interface';

export const getOrderStatisticsAsync = createAsyncThunk(
    'Order/getOrderStatistics',
    async (params: IStatisticOrder): Promise<any> => {
        const response: any = await getOrderStatisticsApi(params);
        return response.data;
    }
);
