import Repository from '../../apis/RepositoryApi';
import { routeAuth } from './route.api';

export const loginApi = async (login: any) => {
    return await Repository(routeAuth['login'], login);
};
