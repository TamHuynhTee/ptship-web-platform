import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUserApi } from '../../SliceApis/Auth/auth.api';
import { IParamGetAllUser } from '../../SliceApis/Auth/auth.interface';

export const getAllUserAsync = createAsyncThunk(
    'user/getAllUser',
    async (params: IParamGetAllUser): Promise<any> => {
        const response = await getAllUserApi(params);
        return { list: response.data, skip: params.skip > 1 };
    }
);
