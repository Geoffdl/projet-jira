import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { Router } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { ModalService } from '../../../../shared/services/modal.service';
import { boardReducer } from '../../../store/board.reducer';

describe('BoardComponent', () => {
    let component: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;

    beforeEach(async () => {
        const mockRouter = {
            navigate: jasmine.createSpy('navigate'),
        };

        const mockModalService = {
            openModal: jasmine.createSpy('openModal'),
            closeModal: jasmine.createSpy('closeModal'),
        };

        await TestBed.configureTestingModule({
            imports: [BoardComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: ModalService, useValue: mockModalService },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BoardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
