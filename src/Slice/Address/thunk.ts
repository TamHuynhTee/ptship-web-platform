import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAddressApi } from '../../SliceApis/Address/address.api';

export const getAllAddressAsync = createAsyncThunk(
    'Address/getAllAddress',
    async (): Promise<any> => {
        const response = await getAllAddressApi();
        return response.data;
    }
);
