import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { boardReducer } from '../../../app/store/board.reducer';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: { params: {} },
            params: { subscribe: () => {} },
        };

        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                provideStore({
                    board: boardReducer,
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
