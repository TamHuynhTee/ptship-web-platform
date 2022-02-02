import { ApiMethods, ApiRoutes } from '../../apis/defineApi';

export const routeOrder: Record<string, ApiRoutes> = {
    getAllStatistics: { method: ApiMethods.GET, url: 'order/statistic' },
};
