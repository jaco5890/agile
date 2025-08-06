import { mockPostsByAuthors } from "../mockData/mockPostsByAuthor";
import { IPost } from "../interfaces/post.interface";
import { mockPosts } from "../mockData/mockPosts";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllPosts(userId: number) {
  //userId would have been used to retrieve all posts for a user
  await delay(1000);
  const data = mockPosts;
  if (!data) throw new Error("No posts found");
  return data;
}

export async function getPost(postId: number): Promise<IPost> {
  await delay(1000);
  const found = mockPosts.find((p) => p.id === postId);
  if (!found) throw new Error("Post not found");
  return found;
}

export async function getUserPost(userId: number) {
  await delay(1000);
  const data = mockPostsByAuthors.filter((p) => p.author.id === userId);
  return data;
}

export async function addPost(newPost: IPost) {
  await delay(1000);
  return newPost;
}

export async function updatePost(updatedPost: IPost) {
  await delay(1000);
  const index = mockPosts.findIndex((p) => p.id === updatedPost.id);
  if (index !== -1) {
    mockPosts[index] = updatedPost;
    return updatedPost;
  } else {
    return false;
  }
}

export async function removePost(postId: string) {
  await delay(1000);
  return true;
}
