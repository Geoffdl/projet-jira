import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { provideStore } from '@ngrx/store';
import { ModalService } from '../../../../shared/services/modal.service';
import { boardReducer } from '../../../store/board.reducer';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(async () => {
        const mockModalService = {
            openModal: jasmine.createSpy('openModal'),
            closeModal: jasmine.createSpy('closeModal'),
        };

        await TestBed.configureTestingModule({
            imports: [TaskComponent],
            providers: [
                { provide: ModalService, useValue: mockModalService },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;

        // Set required input
        fixture.componentRef.setInput('taskId', 1);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
