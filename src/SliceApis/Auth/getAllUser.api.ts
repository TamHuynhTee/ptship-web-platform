import { ApiMethods } from "../../apis/defineApi";
import Repository from "../../apis/RepositoryApi";
import { ReturnListResponse } from "../../apis/Response";

export interface payloadGetAllUser {
  skip: number;
  limit: number;
}

const route = {
  method: ApiMethods.GET,
  url: "auth/findAllUser",
};
export const getAllUserApi = async (
  payload: payloadGetAllUser
): Promise<ReturnListResponse<any>> => {
  return Repository(route, payload);
};
