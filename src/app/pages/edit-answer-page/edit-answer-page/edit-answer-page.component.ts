import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../../question/question.service";
import {Answer} from "../../../answer/answer";

@Component({
  selector: 'app-edit-answer-page',
  templateUrl: './edit-answer-page.component.html',
  styleUrls: ['./edit-answer-page.component.scss']
})
export class EditAnswerPageComponent implements OnInit{
  answerId: number;
  answer: Answer;
  newText: string;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private router: Router)
  {}

  ngOnInit(): void {
    // @ts-ignore
    this.answerId = +this.route.snapshot.paramMap.get('id');

    this.questionService.getAnswer(this.answerId).subscribe(answer => {
      this.answer = answer;
    });
  }

  editAnswer() {
    this.answer.text = this.newText;

    this.questionService.updateAnswer(this.answer).subscribe(updatedAnswer => {
      console.log("Answer updated:", updatedAnswer);
      this.router.navigate(['/questions/details/', updatedAnswer.question.questionId]);
    });


  }

}
