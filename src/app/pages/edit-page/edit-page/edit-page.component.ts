import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../../question/question.service";
import {Question} from "../../../question/question";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
  questionId: number;
  question: Question;
  newText: string;
  newTitle: string;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private router: Router
  ) {}

  ngOnInit() {
    // @ts-ignore
    this.questionId = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(this.questionId).subscribe(question => {
      console.log(question);
      this.question = question;
      console.log(this.question);
    });
  }

  editQuestion() {
    this.question.title = this.newTitle;
    this.question.text = this.newText;

    this.questionService.updateQuestion(this.question).subscribe(updatedQuestion => {
      console.log("Question updated:", updatedQuestion);
      this.router.navigate(['/questions']);
    });
  }

}
