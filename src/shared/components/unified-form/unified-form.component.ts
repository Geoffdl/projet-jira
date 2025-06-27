import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
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
    imports: [FormFieldComponent, ReactiveFormsModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <fieldset class="du-fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend class="du-fieldset-legend">
                    {{ isEditMode() ? 'Edit ' + config().title : 'New ' + config().title }}
                </legend>

                <div class="space-y-3">
                    @for (field of config().fields; track field.key) {
                        <app-form-field
                            class="m-4"
                            [label]="field.label"
                            [placeholder]="field.placeholder"
                            [type]="field.type || 'text'"
                            [control]="$any(form.get(field.key))"
                        />
                    }
                </div>
            </fieldset>

            <button type="submit" class="du-btn du-btn-primary w-full" [disabled]="form.invalid">
                {{ isEditMode() ? 'Save Changes' : config().submitLabel || 'Create' }}
            </button>
        </form>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
