import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswerPageComponent } from './edit-answer-page.component';

describe('EditAnswerPageComponent', () => {
  let component: EditAnswerPageComponent;
  let fixture: ComponentFixture<EditAnswerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnswerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnswerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
