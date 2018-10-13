import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDirectorComponent } from './home-director.component';

describe('HomeDirectorComponent', () => {
  let component: HomeDirectorComponent;
  let fixture: ComponentFixture<HomeDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
