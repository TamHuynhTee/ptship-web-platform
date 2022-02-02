import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, loginApi } from '../../SliceApis/Auth/auth.api';
import { ILogin } from '../../SliceApis/Auth/auth.interface';

export const loginAsync = createAsyncThunk(
    'Auth/login',
    async (login: ILogin): Promise<any> => {
        const response: any = await loginApi(login);
        return response.data;
    }
);

export const getCurrentUserAsync = createAsyncThunk(
    'Auth/getCurrentUser',
    async (): Promise<any> => {
        const response: any = await getUserApi();
        return response.data;
    }
);
