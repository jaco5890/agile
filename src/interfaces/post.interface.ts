import { IAuthor } from "./author.interface";
import { IComment } from "./comment.interface";

export interface IPost {
  id: number;
  content: string;
  author: IAuthor;
  comments: IComment[];
}
