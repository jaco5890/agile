import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request.service";
import { IComment } from "../interfaces/comment.interface";

const baseUrl = `${ServicePath.url.base}${ServicePath.url.commentServicePath}`;

export function addComment(IComment: IComment, token: string) {
  const url = `${baseUrl}`;
  return MakeWebRequest({
    method: "POST",
    url,
    token,
    payload: IComment,
  });
}

export function updateComment(IComment: IComment, token: string) {
  const url = `${baseUrl}`;

  return MakeWebRequest({
    method: "PUT",
    url,
    token,
    payload: IComment,
  });
}

export function removeComment(id: string, token: string) {
  const url = `${baseUrl}/${id}`;

  return MakeWebRequest({
    method: "DELETE",
    url,
    token,
  });
}
