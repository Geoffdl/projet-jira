import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedFormComponent } from './unified-form.component';

describe('UnifiedFormComponent', () => {
  let component: UnifiedFormComponent;
  let fixture: ComponentFixture<UnifiedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
