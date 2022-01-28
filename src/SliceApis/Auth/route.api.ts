import { ApiMethods, ApiRoutes } from '../../apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: { method: ApiMethods.POST, url: 'auth/login' },
    getUser: {
        method: ApiMethods.GET,
        url: '/auth/findUser',
    },
    registerStaff: {
        method: ApiMethods.POST,
        url: 'auth/registerStaff',
    },
};
