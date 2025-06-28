import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDropDownSelectorComponent } from './board-drop-down-selector.component';

describe('BoardDropDownSelectorComponent', () => {
  let component: BoardDropDownSelectorComponent;
  let fixture: ComponentFixture<BoardDropDownSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDropDownSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDropDownSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
