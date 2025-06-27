import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
    let component: FormFieldComponent;
    let fixture: ComponentFixture<FormFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormFieldComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FormFieldComponent);
        component = fixture.componentInstance;

        // Set required inputs
        fixture.componentRef.setInput('label', 'Test Label');
        fixture.componentRef.setInput('control', new FormControl(''));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
