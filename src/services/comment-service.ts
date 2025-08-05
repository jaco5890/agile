import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request-service";
import { CommentPayload } from "../interfaces/comment-interface";

export function addComment(commentPayload: CommentPayload, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.commentServicePath
  return MakeWebRequest({
    method: "POST",
    endpoint,
    token,
    payload: commentPayload,
  });
}

export function updateComment(commentPayload: CommentPayload, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.commentServicePath
  return MakeWebRequest({
    method: "PUT",
    endpoint,
    token,
    payload: commentPayload,
  });
}

export function removeComment(id: string, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.commentServicePath + `/${id}`
  return MakeWebRequest({
    method: "DELETE",
    endpoint,
    token,
  });
}
