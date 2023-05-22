import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailsPageComponent } from './question-details-page.component';

describe('QuestionDetailsPageComponent', () => {
  let component: QuestionDetailsPageComponent;
  let fixture: ComponentFixture<QuestionDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
