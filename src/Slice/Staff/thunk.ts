import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStaffApi } from '../../SliceApis/Auth/auth.api';
import { IParamGetAllStaff } from '../../SliceApis/Auth/auth.interface';

export const getAllStaffAsync = createAsyncThunk(
    'staff/getAllStaff',
    async (params: IParamGetAllStaff): Promise<any> => {
        const response = await getAllStaffApi(params);
        return { list: response.data, skip: params.skip > 1 };
    }
);
