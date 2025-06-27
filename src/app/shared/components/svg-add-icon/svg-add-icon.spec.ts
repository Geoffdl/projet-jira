import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAddIcon } from './svg-add-icon';

describe('SvgAddIcon', () => {
  let component: SvgAddIcon;
  let fixture: ComponentFixture<SvgAddIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgAddIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgAddIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
