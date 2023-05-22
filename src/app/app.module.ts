import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NavbarModule } from "./navbar/navbar.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RouterModule, Routes, Route } from "@angular/router";
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { QuestionDetailsPageComponent } from './pages/question-details-page/question-details-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { AskPageComponent } from './pages/ask-page/ask-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import {AuthInterceptor} from "./authentication/interceptor";
import {AuthGuard} from "./authentication/guard";
import { EditPageComponent } from './pages/edit-page/edit-page/edit-page.component';
import { EditAnswerPageComponent } from './pages/edit-answer-page/edit-answer-page/edit-answer-page.component';
import { BannedPageComponent } from './pages/banned-page/banned-page/banned-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  { path: 'users/details/:id', component : UserDetailsPageComponent, canActivate: [AuthGuard]},
  { path: 'users/details', component : UserDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'questions/details/:id', component: QuestionDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'questions/details', component: QuestionDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'questions/edit/:id', component : EditPageComponent, canActivate: [AuthGuard] },
  { path: 'questions', component: QuestionPageComponent, canActivate: [AuthGuard] },
  { path: 'answers/edit/:id', component: EditAnswerPageComponent, canActivate: [AuthGuard] },
  { path: 'askSomething', component: AskPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegistrationPageComponent},
  { path: 'banned', component: BannedPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    HomePageComponent,
    QuestionPageComponent,
    QuestionDetailsPageComponent,
    UserDetailsPageComponent,
    AskPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    EditPageComponent,
    EditAnswerPageComponent,
    BannedPageComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NavbarModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
