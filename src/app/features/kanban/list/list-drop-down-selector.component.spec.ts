import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDropDownSelectorComponent } from './list-drop-down-selector.component';

describe('ListDropDownSelectorComponent', () => {
  let component: ListDropDownSelectorComponent;
  let fixture: ComponentFixture<ListDropDownSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDropDownSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDropDownSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
