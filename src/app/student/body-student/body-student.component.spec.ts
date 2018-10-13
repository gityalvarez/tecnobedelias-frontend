import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyStudentComponent } from './body-student.component';

describe('BodyStudentComponent', () => {
  let component: BodyStudentComponent;
  let fixture: ComponentFixture<BodyStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
