import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDataService } from './board-data-service';

describe('BoardDataService', () => {
  let component: BoardDataService;
  let fixture: ComponentFixture<BoardDataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
