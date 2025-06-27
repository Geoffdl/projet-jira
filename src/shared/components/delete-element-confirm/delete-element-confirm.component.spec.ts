import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteElementConfirmComponent } from './delete-element-confirm.component';

describe('DeleteElementConfirmComponent', () => {
    let component: DeleteElementConfirmComponent;
    let fixture: ComponentFixture<DeleteElementConfirmComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeleteElementConfirmComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteElementConfirmComponent);
        component = fixture.componentInstance;

        // Set required title input
        fixture.componentRef.setInput('title', 'Test Title');
        fixture.componentRef.setInput('buttonText', 'Test Button');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
