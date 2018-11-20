import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreviasComponent } from './lista-previas.component';

describe('ListaPreviasComponent', () => {
  let component: ListaPreviasComponent;
  let fixture: ComponentFixture<ListaPreviasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPreviasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPreviasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
