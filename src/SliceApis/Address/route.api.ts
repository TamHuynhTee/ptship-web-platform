import { ApiMethods, ApiRoutes } from '../../apis/defineApi';

export const routeAddress: Record<string, ApiRoutes> = {
    getAllAddress: { method: ApiMethods.GET, url: 'address/getAllAddress' },
    createAddress: {
        method: ApiMethods.POST,
        url: 'address/createAddress',
    },
    updateAddress: {
        method: ApiMethods.PUT,
        url: 'address/updateAddress',
    },
    deleteAddress: {
        method: ApiMethods.DELETE,
        url: 'address/deleteAddress',
    },
};
