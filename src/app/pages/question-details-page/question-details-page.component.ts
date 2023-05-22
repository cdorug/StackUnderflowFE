import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { Question } from "../../question/question";
import { QuestionService } from "../../question/question.service";
import { User } from "../../user/user";
import { UserService } from "../../user/user.service";
import {Observable} from "rxjs";
import {Answer} from "../../answer/answer";
import {Vote} from "../../vote/vote";

@Component({
  selector: 'app-question-details-page',
  templateUrl: './question-details-page.component.html',
  styleUrls: ['./question-details-page.component.scss']
})
export class QuestionDetailsPageComponent {
  question: Question;
  answers: Answer[];
  author: User;
  loggedInUsername: string | null;
  myAnswerText: string;
  myAnswerImageLink: string;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuestion();
    this.loggedInUsername = localStorage.getItem('currentUser');
    this.getAuthor();
  }

  getQuestion(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');

    this.questionService.getQuestion(id).subscribe(question => {
        this.question = question;
        this.getAnswers()
      }
    );
  }

  getAuthor(): void {
    let username = localStorage.getItem('currentUser');
    this.userService.getUserByUsername(username).subscribe( user => {
        this.author = user
      }
    );
  }

  getAnswers(): void {
    this.questionService.getAnswers(this.question.questionId).subscribe(answers => {
        this.answers = answers.sort((a, b) => b.votes - a.votes);
      }
    );
  }

  redirectToEdit(answerId: number) {
    this.router.navigate(['/answers/edit', answerId]);
  }

  editAnswer(answer: Answer) {
    this.redirectToEdit(answer.answerId)
  }

  deleteAnswer(answer: Answer) {
    this.questionService.deleteAnswer(answer.answerId).subscribe(() => {
      console.log("Answer deleted successfully.");
      this.getAnswers();
    }, (error) => {
      console.error("Error deleting answer:", error);
    });
  }

  submitMyAnswer() {
    let newAnswer = new Answer();
    newAnswer.author = this.author;
    console.log(this.author.username, this.author.email)
    newAnswer.question = this.question;
    newAnswer.text = this.myAnswerText;
    let currentDate = new Date();
    newAnswer.date = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    newAnswer.time = currentDate.toTimeString().split(' ')[0]; // Format: HH:mm:ss
    newAnswer.votes = 0;
    newAnswer.imageURL = this.myAnswerImageLink;

    this.questionService.createAnswer(newAnswer).subscribe(() => {
      console.log("Answer created successfully.");
      this.getAnswers();
    }, (error) => {
      console.error("Error creating answer:", error);
    });
  }

  voteUp(answer: Answer) {
    let vote = new Vote();
    vote.vote = true;
    vote.answer = answer;
    vote.user = this.author;

    this.questionService.vote(vote).subscribe(() => {
      console.log("Answer voted successfully.");
      this.getQuestion();
    }, (error) => {
      console.error("Error voting answer:", error);
    });
  }

  voteDown(answer: Answer) {
    let vote = new Vote();
    vote.vote = false;
    vote.answer = answer;
    vote.user = this.author;

    this.questionService.vote(vote).subscribe(() => {
      console.log("Answer voted successfully.");
      this.getQuestion();
    }, (error) => {
      console.error("Answer voting question:", error);
    });
  }

}
