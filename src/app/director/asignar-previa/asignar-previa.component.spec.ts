import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPreviaComponent } from './asignar-previa.component';

describe('AsignarPreviaComponent', () => {
  let component: AsignarPreviaComponent;
  let fixture: ComponentFixture<AsignarPreviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPreviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
