import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsItemListComponent } from './bets-item-list.component';

describe('BetsItemListComponent', () => {
  let component: BetsItemListComponent;
  let fixture: ComponentFixture<BetsItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
