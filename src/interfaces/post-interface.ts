import { AuthorPayload } from "./author-interface";
import { CommentPayload } from "./comment-interface";

export interface PostPayload {
  id: number;
  content: string;
  author: AuthorPayload;
  comments: CommentPayload[];
}
