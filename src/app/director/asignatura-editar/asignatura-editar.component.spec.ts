import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaEditarComponent } from './asignatura-editar.component';

describe('AsignaturaEditarComponent', () => {
  let component: AsignaturaEditarComponent;
  let fixture: ComponentFixture<AsignaturaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaturaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
