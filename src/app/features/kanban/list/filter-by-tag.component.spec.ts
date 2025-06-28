import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { boardReducer } from '../../../store/board.reducer';

import { FilterByTagComponent } from './filter-by-tag.component';

describe('FilterByTagComponent', () => {
    let component: FilterByTagComponent;
    let fixture: ComponentFixture<FilterByTagComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterByTagComponent],
            providers: [
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FilterByTagComponent);
        component = fixture.componentInstance;

        // Set required input
        fixture.componentRef.setInput('boardId', 1);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
