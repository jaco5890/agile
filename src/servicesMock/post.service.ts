import { IPost } from "../interfaces/post.interface";
import { mockPosts } from "../mockData/mockPosts";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAllPosts(userId: string) {
  await delay(1000);
  const data = mockPosts.filter(p => p.author.id.toString() === userId);
  return {
    data,
    responseCode: 200,
    error: ""
  };
}

export async function getPost(postId: string) {
  await delay(1000);
  const found = mockPosts.find(p => p.id.toString() === postId);
  return {
    data: found || null,
    responseCode: found ? 200 : 404,
    error: found ? "" : "Post not found"
  };
}

export async function getUserPost(userId: string) {
  await delay(1000);
  const data = mockPosts.filter(p => p.author.id.toString() === userId);
  return {
    data,
    responseCode: 200,
    error: ""
  };
}

export async function addPost(newPost: IPost) {
  await delay(1000);
  return {
    data: newPost,
    responseCode: 201,
    error: ""
  };
}

export async function updatePost(updatedPost: IPost) {
  await delay(1000);
  const index = mockPosts.findIndex(p => p.id === updatedPost.id);
  if (index !== -1) {
    mockPosts[index] = updatedPost;
    return {
      data: updatedPost,
      responseCode: 200,
      error: ""
    };
  } else {
    return {
      data: null,
      responseCode: 404,
      error: "Post not found"
    };
  }
}

export async function removePost(postId: string) {
  await delay(1000);
  return {
    data: [],
    responseCode: 200,
    error: ""
  };
}
