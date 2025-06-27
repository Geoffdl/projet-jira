import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAddIconComponent } from './svg-add-icon.component';

describe('SvgAddIconComponent', () => {
  let component: SvgAddIconComponent;
  let fixture: ComponentFixture<SvgAddIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgAddIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgAddIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
