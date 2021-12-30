import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllStaffApi,
  payloadGetAllStaff,
} from "../../../SliceApis/Auth/getAllStaff.api";

export const getAllStaffAsync = createAsyncThunk(
  "staff/getAllStaff",
  async (payload: payloadGetAllStaff): Promise<any> => {
    const response = await getAllStaffApi(payload);
    return response.data;
  }
);
