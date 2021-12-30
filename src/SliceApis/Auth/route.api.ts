import { ApiMethods, ApiRoutes } from '../../apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: { method: ApiMethods.POST, url: 'Authentication/Login' },
    registerTeacher: {
        method: ApiMethods.POST,
        url: 'Authentication/Register',
    },
};
