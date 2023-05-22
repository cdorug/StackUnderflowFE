import { User } from "../user/user";
import { Tag } from "./tag";

export class Question {
  questionId: number;
  author: User;
  title: string;
  text: string;
  date: string;
  time: string;
  imageURL: string;
  votes: number;
  tags: Tag[];
}
