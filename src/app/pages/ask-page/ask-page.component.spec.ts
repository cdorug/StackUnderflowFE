import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPageComponent } from './ask-page.component';

describe('AskPageComponent', () => {
  let component: AskPageComponent;
  let fixture: ComponentFixture<AskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
