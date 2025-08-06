import { ServicePath } from "../constants";
import { MakeWebRequest } from "./request.service";

const baseUrl = `${ServicePath.url.base}${ServicePath.url.userServicePath}`;
export function getAllUsers(userId: string, token: string) {
  const url = `${baseUrl}/${userId}`;

  return MakeWebRequest({
    method: "GET",
    url,
    token,
  });
}
