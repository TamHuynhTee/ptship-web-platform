import { ApiMethods, ApiRoutes } from '../../apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: { method: ApiMethods.POST, url: 'auth/login' },
    getUser: {
        method: ApiMethods.GET,
        url: '/auth/findUser',
    },
    register: {
        method: ApiMethods.POST,
        url: '/auth/register',
    },
    changePass: {
        method: ApiMethods.POST,
        url: '/auth/changePassword',
    },
    updateUser: {
        method: ApiMethods.POST,
        url: '/auth/updateUser',
    },
    getAllStaff: {
        method: ApiMethods.GET,
        url: '/auth/findStaff',
    },
    getAllUser: {
        method: ApiMethods.GET,
        url: '/auth/findAllUser',
    },
    registerStaff: {
        method: ApiMethods.POST,
        url: 'auth/registerStaff',
    },
};
