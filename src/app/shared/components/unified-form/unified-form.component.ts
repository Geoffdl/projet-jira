import { Component, computed, effect, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../form-field/form-field.component';

export interface FormFieldConfig {
    key: string;
    label: string;
    placeholder: string;
    type?: string;
    validators?: any[];
}

export interface FormConfig {
    title: string;
    fields: FormFieldConfig[];
    submitLabel?: string;
}

@Component({
    selector: 'app-unified-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
            <fieldset class="du-fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend class="du-fieldset-legend">
                    {{ isEditMode() ? 'Edit ' + config().title : 'New ' + config().title }}
                </legend>

                @for (field of config().fields; track field.key) {
                    <app-form-field
                        [label]="field.label"
                        [placeholder]="field.placeholder"
                        [type]="field.type || 'text'"
                        [control]="$any(form.get(field.key))"
                    />
                }
            </fieldset>

            <button type="submit" class="du-btn du-btn-primary" [disabled]="form.invalid">
                {{ isEditMode() ? 'Save Changes' : config().submitLabel || 'Create' }}
            </button>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, FormFieldComponent],
})
export class UnifiedFormComponent {
    private readonly fb = inject(FormBuilder);

    config = input.required<FormConfig>();

    data = input<Record<string, any>>();

    formSubmit = output<Record<string, any>>();

    readonly isEditMode = computed(() => !!this.data());

    form!: FormGroup;

    constructor() {
        effect(() => {
            const currentConfig = this.config();
            this.initializeForm(currentConfig);
        });

        effect(() => {
            const data = this.data();
            if (data && this.form) {
                this.form.patchValue(data);
            }
        });
    }

    private initializeForm(config: FormConfig): void {
        const formControls: Record<string, any> = {};

        formControls['id'] = [0];

        for (const field of config.fields) {
            formControls[field.key] = ['', field.validators || []];
        }

        this.form = this.fb.nonNullable.group(formControls);
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formData = this.form.getRawValue();

            if (this.isEditMode()) {
                this.formSubmit.emit(formData);
            } else {
                const { id, ...createData } = formData;
                this.formSubmit.emit(createData);
                this.form.reset();
            }
        }
    }
}
