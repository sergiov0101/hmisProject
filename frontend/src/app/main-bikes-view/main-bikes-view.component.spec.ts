import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBikesViewComponent } from './main-bikes-view.component';

describe('MainBikesViewComponent', () => {
  let component: MainBikesViewComponent;
  let fixture: ComponentFixture<MainBikesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBikesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBikesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
