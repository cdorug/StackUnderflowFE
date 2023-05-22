import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../question/question.service";
import {Answer} from "../../answer/answer";
import {Question} from "../../question/question";
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {Tag} from "../../question/tag";

@Component({
  selector: 'app-ask-page',
  templateUrl: './ask-page.component.html',
  styleUrls: ['./ask-page.component.scss']
})
export class AskPageComponent implements OnInit {
  questionTitle: string;
  questionLink: string;
  questionTags: string;
  questionText: string;
  author: User;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private userService: UserService,
              private router: Router)
  {}

  ngOnInit(): void {
    let username = localStorage.getItem('currentUser');
    this.userService.getUserByUsername(username).subscribe( user => {
        this.author = user
      }
    );
  }

  askQuestion() {
    let newQuestion = new Question();
    newQuestion.author = this.author;
    newQuestion.title = this.questionTitle;
    newQuestion.text = this.questionText;

    let currentDate = new Date();
    newQuestion.date = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    newQuestion.time = currentDate.toTimeString().split(' ')[0]; // Format: HH:mm:ss

    newQuestion.imageURL = this.questionLink;
    newQuestion.votes = 0;

    let newTags: Tag[] = [];
    let stringArray = this.questionTags.split(",");
    for (let i = 0; i < stringArray.length; i++) {
      let currentString = stringArray[i];
      let newTag = new Tag();
      newTag.tagText = currentString;
      newTags.push(newTag);
    }
    newQuestion.tags = newTags;

    this.questionService.createQuestion(newQuestion).subscribe(() => {
      console.log("Question created successfully.");
      this.router.navigate(['/questions']);
    }, (error) => {
      console.error("Error creating question:", error);
    });
  }
}
