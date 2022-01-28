import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from '../../SliceApis/Auth/auth.api';

export const getCurrentUserAsync = createAsyncThunk(
    'Auth/getCurrentUser',
    async (): Promise<any> => {
        const response: any = await getUserApi();
        return response.data;
    }
);
