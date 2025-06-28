import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { of } from 'rxjs';

import { BoardDetailComponent } from './board-detail.component';
import { boardReducer } from '../../store/board.reducer';

describe('BoardDetailComponent', () => {
    let component: BoardDetailComponent;
    let fixture: ComponentFixture<BoardDetailComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                params: {},
                paramMap: {
                    get: jasmine.createSpy('get').and.returnValue('1'),
                },
            },
            params: { subscribe: () => {} },
            paramMap: of({
                get: (key: string) => (key === 'boardId' ? '1' : null),
            }),
        };

        await TestBed.configureTestingModule({
            imports: [BoardDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BoardDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
