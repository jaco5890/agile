import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request-service";
import { PostPayload } from "../interfaces/post-interface";

export function getAllPosts(userId: string, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.postServicePath + `${userId}`
  return MakeWebRequest({
    method: "GET",
    endpoint,
    token,
  });
}

export function getPost(postId: string, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.postServicePath + `${postId}`
  return MakeWebRequest({
    method: "POST",
    endpoint,
    token,
  });
}

export function addPost(postPayload: PostPayload, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.postServicePath
  return MakeWebRequest({
    method: "POST",
    endpoint,
    token,
    payload: postPayload,
  });
}

export function updatePost(postPayload: PostPayload, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.postServicePath
  return MakeWebRequest({
    method: "PUT",
    endpoint,
    token,
    payload: postPayload,
  });
}

export function removePost(id: string, token: string) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.postServicePath + `/${id}`
  return MakeWebRequest({
    method: "DELETE",
    endpoint,
    token,
  });
}
