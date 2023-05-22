import {Component, OnInit} from '@angular/core';
import {Question} from "../../question/question";
import {QuestionService} from "../../question/question.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user";
import {Vote} from "../../vote/vote";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  questions: Question[];
  originalQuestions: Question[];
  selectedquestion: Question;
  searchString: string = '';
  searchTagString: string = '';
  searchUserString: string = '';
  sortBy: string = '';
  currentCount: number = 0;
  loggedInUsername: string | null;
  currentUser: User;

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getQuestions();
    this.loggedInUsername = localStorage.getItem('currentUser');
    this.userService.getUserByUsername(this.loggedInUsername).subscribe( user => {
        this.currentUser = user
        console.log(user.role)
      }
    );
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(questions => {
        this.questions = questions;
        this.currentCount = this.questions.length;
      }
    );
  }

  onSelect(question: Question) {
    this.selectedquestion = question;
  }

  sortQuestions(order: string) {
    if(order === 'votes') {
      this.questions.sort( (a, b) => b.votes - a.votes );
    }
    else if(order === 'datePosted') {
      this.questions.sort((a, b) => {
        if (a.date === b.date) {
          return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0);
        } else {
          return (a.date < b.date) ? 1 : -1;
        }
      });
    }
    else if(order === 'title') {
      this.questions.sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0) )
    }
    else if(order === 'myQuestions') {
      this.questions = this.questions.filter(question => question.author.username === this.loggedInUsername);
    }
  }

  searchQuestionsByTitle(searchString: string) {
    this.questions = this.questions.filter((question) => question.title.toLowerCase().includes(searchString.toLowerCase()));
    this.currentCount = this.questions.length;
  }

  onSearchInputChange(event: Event): void {
    if(this.searchString === '')
    {
      this.getQuestions();
    }
    else {
      this.searchQuestionsByTitle(this.searchString)
    }
  }

  onTagSearchInputChange(searchString: string) {
    if (searchString === '') {
      this.getQuestions();
    } else {
      this.questions = this.questions.filter((question) => {
        // Check if any tag's name matches the search string
        const lowercaseSearchString = searchString.toLowerCase();
        return question.tags.some(tag => tag.tagText.toLowerCase().includes(lowercaseSearchString));
      });
      this.currentCount = this.questions.length;
    }
  }


  onUserSearchInputChange(searchString: string) {
    if (this.searchUserString === '') {
      this.getQuestions();
    } else {
      const n = searchString.length; // Length of the input string

      this.questions = this.questions.filter((question) => {
        // Check if the first n characters of the author's username match the search string
        const authorUsername = question.author.username.toLowerCase();
        return authorUsername.substring(0, n) === searchString.toLowerCase();
      });

      this.currentCount = this.questions.length;
    }
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question.questionId).subscribe(() => {
      console.log("Question deleted successfully.");
      this.getQuestions();
    }, (error) => {
      console.error("Error deleting question:", error);
    });
  }

  redirectToEdit(questionId: number) {
    this.router.navigate(['/questions/edit', questionId]);
  }

  editQuestion(question: Question) {
    this.redirectToEdit(question.questionId);
  }

  voteUp(question: Question) {
    let vote = new Vote();
    vote.vote = true;
    vote.question = question;
    vote.user = this.currentUser;

    this.questionService.vote(vote).subscribe(() => {
      console.log("Question voted successfully.");
      this.getQuestions();
    }, (error) => {
      console.error("Error voting question:", error);
    });
  }

  voteDown(question: Question) {
    let vote = new Vote();
    vote.vote = false;
    vote.question = question;
    vote.user = this.currentUser;

    this.questionService.vote(vote).subscribe(() => {
      console.log("Question voted successfully.");
      this.getQuestions();
    }, (error) => {
      console.error("Error voting question:", error);
    });
  }

}
