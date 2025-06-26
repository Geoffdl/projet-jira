import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-field',
    template: `
        <label class="du-label">{{ label() }}</label>
        <input [type]="type()" [class]="getInputClasses()" [placeholder]="placeholder()" [formControl]="control()" />
        @if (getErrorMessage(); as errorMsg) {
            <p class="text-warning mt-1 text-sm">{{ errorMsg }}</p>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule],
})
export class FormFieldComponent {
    label = input.required<string>();
    control = input.required<FormControl>();
    placeholder = input<string>('');
    type = input<string>('text');

    readonly validationErrors: Record<string, (error: any) => string> = {
        required: () => `${this.label()} is required`,
        minlength: (error) => `${this.label()} must be at least ${error.requiredLength} characters`,
        maxlength: (error) => `${this.label()} must be at most ${error.requiredLength} characters`,
        email: () => `Please enter a valid email address`,
        pattern: () => `${this.label()} format is invalid`,
    };

    getErrorMessage(): string | null {
        const control = this.control();
        if (!control.errors || !control.touched) {
            return null;
        }

        const firstErrorKey = Object.keys(control.errors)[0];
        const errorHandler = this.validationErrors[firstErrorKey];

        return errorHandler ? errorHandler(control.errors[firstErrorKey]) : `${this.label()} is invalid`;
    }

    getInputClasses(): string {
        const control = this.control();
        const baseClasses = 'du-input';

        if (!control.touched) {
            return baseClasses;
        }

        return control.valid ? `${baseClasses} du-input-success` : `${baseClasses} du-input-warning`;
    }
}
