import { IAuthor } from "./author.interface";
export interface IComment {
  id: number;
  content: string;
  author: IAuthor;
}
