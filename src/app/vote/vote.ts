import {Question} from "../question/question";
import {Answer} from "../answer/answer";
import {User} from "../user/user";

export class Vote {
  voteId: string;
  vote: boolean;
  question: Question;
  answer: Answer;
  user: User;
}
