import { IComment } from "../interfaces/comment.interface";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addComment(newComment: IComment): Promise<IComment> {
  await delay(1000);
  return newComment;
}

export async function updateComment(
  updatedComment: IComment
): Promise<IComment | false> {
  await delay(1000);
  return updatedComment;
}

export async function deleteComment(commentId: number): Promise<number> {
  await delay(1000);
  return commentId;
}
