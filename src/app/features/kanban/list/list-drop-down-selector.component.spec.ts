import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { boardReducer } from '../../../store/board.reducer';

import { ListDropDownSelectorComponent } from './list-drop-down-selector.component';

describe('ListDropDownSelectorComponent', () => {
    let component: ListDropDownSelectorComponent;
    let fixture: ComponentFixture<ListDropDownSelectorComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: { params: {} },
            params: { subscribe: () => {} },
        };

        await TestBed.configureTestingModule({
            imports: [ListDropDownSelectorComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListDropDownSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
