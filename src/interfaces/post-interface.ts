import { CommentPayload } from "./comment-interface";
import { UserPayload } from "./user-interface";

export interface PostPayload {
  id: number;
  content: string;
  author: UserPayload;
  comments: CommentPayload[];
}
