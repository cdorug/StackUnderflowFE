import {Answer} from "../answer/answer";

export const ANSWERS: Answer[][] = [
  [
    {
      id : 1,
      text: 'Maybe you should try to reinstall Angular as well as NodeJS. You could also try to manually remove the node_modules folder and to use npm install.',
      authorId: 2,
      votes: 0,
      datePosted: '23/04/2023'
    },
    {
      id : 2,
      text: 'Make sure that the RouterModule is imported in app.component.ts',
      authorId: 7,
      votes: 1,
      datePosted: '24/04/2023'
    },
    {
      id : 5,
      text: 'Make sure that the RouterModule is imported in app.component.ts',
      authorId: 4,
      votes: 1,
      datePosted: '24/04/2023'
    },
  ],
  [
    {
      id : 3,
      text: 'Maybe you should try to reinstall Angular as well as NodeJS. You could also try to manually remove the node_modules folder and to use npm install.',
      authorId: 3,
      votes: 3,
      datePosted: '23/04/2023'
    },
    {
      id : 4,
      text: 'Make sure that the RouterModule is imported in app.component.ts',
      authorId: 4,
      votes: 1,
      datePosted: '24/04/2023'
    },
  ],



];
