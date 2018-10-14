import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaFormComponent } from './asignatura-form.component';

describe('AsignaturaFormComponent', () => {
  let component: AsignaturaFormComponent;
  let fixture: ComponentFixture<AsignaturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
