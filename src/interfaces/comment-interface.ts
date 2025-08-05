import { AuthorPayload } from "./author-interface";

export interface CommentPayload {
  id: number;
  content: string;
  author: AuthorPayload;
}
