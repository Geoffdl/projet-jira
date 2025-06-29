import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleModalComponent } from './simple-modal.component';

describe('SimpleModalComponent', () => {
    let component: SimpleModalComponent;
    let fixture: ComponentFixture<SimpleModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SimpleModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SimpleModalComponent);
        component = fixture.componentInstance;

        // Set required modalId input
        fixture.componentRef.setInput('modalId', 'test-modal-id');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
