import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUserApi,
  payloadGetAllUser,
} from "../../../SliceApis/Auth/getAllUser.api";

export const getAllUserAsync = createAsyncThunk(
  "user/getAllUser",
  async (payload: payloadGetAllUser): Promise<any> => {
    const response = await getAllUserApi(payload);
    return response.data;
  }
);
