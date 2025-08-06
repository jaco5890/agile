import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request.service";
import { IPost } from "../interfaces/post.interface";

const baseUrl = `${ServicePath.url.base}${ServicePath.url.postServicePath}`;
export function getAllPosts(userId: string, token: string) {
  const url = `${baseUrl}/${userId}`;

  return MakeWebRequest({
    method: "GET",
    url,
    token,
  });
}

export function getPost(postId: string, token: string) {
  const url = `${baseUrl}/${postId}`;

  return MakeWebRequest({
    method: "POST",
    url,
    token,
  });
}

export function addPost(IPost: IPost, token: string) {
  const url = `${baseUrl}`;

  return MakeWebRequest({
    method: "POST",
    url,
    token,
    payload: IPost,
  });
}

export function updatePost(IPost: IPost, token: string) {
  const url = `${baseUrl}`;

  return MakeWebRequest({
    method: "PUT",
    url,
    token,
    payload: IPost,
  });
}

export function removePost(postId: string, token: string) {
  const url = `${baseUrl}/${postId}`;

  return MakeWebRequest({
    method: "DELETE",
    url,
    token,
  });
}
