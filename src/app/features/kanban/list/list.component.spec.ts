import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { provideStore } from '@ngrx/store';
import { ModalService } from '../../../../shared/services/modal.service';
import { boardReducer } from '../../../store/board.reducer';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        const mockModalService = {
            openModal: jasmine.createSpy('openModal'),
            closeModal: jasmine.createSpy('closeModal'),
        };

        await TestBed.configureTestingModule({
            imports: [ListComponent],
            providers: [
                { provide: ModalService, useValue: mockModalService },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;

        // Set required inputs
        fixture.componentRef.setInput('listId', 1);
        fixture.componentRef.setInput('boardId', 1);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
