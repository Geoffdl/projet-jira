import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickActionComponent } from './click-action.component';

describe('ClickActionComponent', () => {
  let component: ClickActionComponent;
  let fixture: ComponentFixture<ClickActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
