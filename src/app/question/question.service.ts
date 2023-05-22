import { Injectable } from '@angular/core';
import { Question } from "./question";
import { Observable, of } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../answer/answer";
import {Vote} from "../vote/vote";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private getAllQuestions = 'http://localhost:8080/stackoverflow/questions/getAllQuestions';
  private getOneQuestion = 'http://localhost:8080/stackoverflow/questions/getQuestionById';
  private getAnswersOfQuestion = 'http://localhost:8080/stackoverflow/answers/getAnswersByQuestionId';
  private deleteQuestionById = "http://localhost:8080/stackoverflow/questions/deleteQuestionById";
  private editQuestion = "http://localhost:8080/stackoverflow/questions/editQuestion";
  private getOneAnswer = 'http://localhost:8080/stackoverflow/answers/getAnswerById';
  private deleteAnswerById = 'http://localhost:8080/stackoverflow/answers/deleteAnswerById';
  private editAnswer = 'http://localhost:8080/stackoverflow/answers/editAnswer';
  private newAnswer = 'http://localhost:8080/stackoverflow/answers/createAnswer';
  private newQuestion = 'http://localhost:8080/stackoverflow/questions/createQuestion';
  private createVote = 'http://localhost:8080/stackoverflow/questions/createVote';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {

    return this.http.get<Question[]>(this.getAllQuestions);
  }

  getQuestion(id: number) : Observable<Question> {
    return this.http.get<Question>(`${this.getOneQuestion}/${id}`);
  }

  deleteQuestion(id: number) : Observable<any> {
    return this.http.delete(`${this.deleteQuestionById}/${id}`);
  }

  updateQuestion(updatedQuestion: Question): Observable<Question> {
    const id = updatedQuestion.questionId;
    return this.http.put<Question>(`${this.editQuestion}/${id}`, updatedQuestion);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.newQuestion}`, question)
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.newAnswer}`, answer)
  }

  updateAnswer(updatedAnswer: Answer): Observable<Answer> {
    const id = updatedAnswer.answerId;
    return this.http.put<Answer>(`${this.editAnswer}/${id}`, updatedAnswer);
  }

  getAnswers(id: number) : Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.getAnswersOfQuestion}/${id}`);
  }

  getAnswer(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.getOneAnswer}/${id}`);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(`${this.deleteAnswerById}/${id}`);
  }

  vote(vote: Vote) {
    return this.http.post<Vote>(`${this.createVote}`, vote);
  }


}
