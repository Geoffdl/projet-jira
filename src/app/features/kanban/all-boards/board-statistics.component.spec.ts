import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { boardReducer } from '../../../store/board.reducer';

import { BoardStatisticsComponent } from './board-statistics.component';

describe('BoardStatisticsComponent', () => {
    let component: BoardStatisticsComponent;
    let fixture: ComponentFixture<BoardStatisticsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BoardStatisticsComponent],
            providers: [
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BoardStatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
