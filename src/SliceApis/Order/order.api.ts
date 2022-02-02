import Repository from '../../apis/RepositoryApi';
import { ReturnResponse } from '../../apis/Response';
import { IStatisticOrder, resStatisticOrder } from './order.interface';
import { routeOrder } from './route.api';

export const getOrderStatisticsApi = async (
    params: IStatisticOrder
): Promise<ReturnResponse<resStatisticOrder>> => {
    return await Repository(routeOrder['getAllStatistics'], params);
};
