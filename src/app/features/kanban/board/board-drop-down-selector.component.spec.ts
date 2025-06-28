import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { boardReducer } from '../../../store/board.reducer';

import { BoardDropDownSelectorComponent } from './board-drop-down-selector.component';

describe('BoardDropDownSelectorComponent', () => {
    let component: BoardDropDownSelectorComponent;
    let fixture: ComponentFixture<BoardDropDownSelectorComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: { params: {} },
            params: { subscribe: () => {} },
        };

        await TestBed.configureTestingModule({
            imports: [BoardDropDownSelectorComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BoardDropDownSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
