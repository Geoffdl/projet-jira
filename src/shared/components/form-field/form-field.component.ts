import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-field',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="du-form-control w-full">
            <label class="du-label">
                <span class="du-label-text">{{ label() }}</span>
            </label>
            <input [type]="type()" [class]="getInputClasses()" [placeholder]="placeholder()" [formControl]="control()" />
            @if (getErrorMessage(); as errorMsg) {
                <label class="du-label">
                    <span class="du-label-text-alt text-warning">{{ errorMsg }}</span>
                </label>
            }
        </div>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Generic form field element : controls the input and reacts dynamically to display if the field meats required criterias
 * @param label name of the field
 * @param control validator used on this field
 * @param  placeholder
 * @param type input type, defaulft to text
 */
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
        const baseClasses = 'du-input du-input-bordered w-full';

        if (!control.touched) {
            return baseClasses;
        }

        return control.valid ? `${baseClasses} du-input-success` : `${baseClasses} du-input-warning`;
    }
}
