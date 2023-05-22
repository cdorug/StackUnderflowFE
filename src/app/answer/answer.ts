import { User } from "../user/user";
import { Question } from "../question/question";

export class Answer {
  answerId: number;
  author: User;
  question: Question;
  text: string;
  date: string;
  time: string;
  votes: number;
  imageURL: string;
}
