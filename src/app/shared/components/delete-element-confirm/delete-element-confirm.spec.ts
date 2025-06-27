import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteElementConfirmComponent } from './delete-element-confirm';

describe('DeleteElementConfirmComponent', () => {
    let component: DeleteElementConfirmComponent;
    let fixture: ComponentFixture<DeleteElementConfirmComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeleteElementConfirmComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteElementConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
