import { UserPayload } from "./user-interface";

export interface CommentPayload {
  id: number;
  content: string;
  author: UserPayload;
}
