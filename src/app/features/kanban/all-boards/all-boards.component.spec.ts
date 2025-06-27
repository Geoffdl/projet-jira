import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoardsComponent } from './all-boards.component';
import { Router } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { ModalService } from '../../../../shared/services/modal.service';
import { boardReducer } from '../../../store/board.reducer';

describe('AllBoardsComponent', () => {
    let component: AllBoardsComponent;
    let fixture: ComponentFixture<AllBoardsComponent>;

    beforeEach(async () => {
        const mockRouter = {
            navigate: jasmine.createSpy('navigate'),
        };

        const mockModalService = {
            openModal: jasmine.createSpy('openModal'),
            closeModal: jasmine.createSpy('closeModal'),
        };

        await TestBed.configureTestingModule({
            imports: [AllBoardsComponent],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: ModalService, useValue: mockModalService },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AllBoardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
