import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDirectorComponent } from './body-director.component';

describe('BodyDirectorComponent', () => {
  let component: BodyDirectorComponent;
  let fixture: ComponentFixture<BodyDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
