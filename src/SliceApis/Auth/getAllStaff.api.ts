import { ApiMethods } from "../../apis/defineApi";
import Repository from "../../apis/RepositoryApi";
import { ReturnListResponse } from "../../apis/Response";

export interface payloadGetAllStaff {
  skip: number;
  limit: number;
}

const route = {
  method: ApiMethods.GET,
  url: "auth/findStaff",
};
export const getAllStaffApi = async (
  payload: payloadGetAllStaff
): Promise<ReturnListResponse<any>> => {
  return Repository(route, payload);
};
