import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteElementConfirm } from './delete-element-confirm';

describe('DeleteElementConfirm', () => {
  let component: DeleteElementConfirm;
  let fixture: ComponentFixture<DeleteElementConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteElementConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteElementConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
