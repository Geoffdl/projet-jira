import {
    Component,
    EventEmitter,
    Input,
    Output,
    effect,
    inject,
    input,
    output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormControl,
} from '@angular/forms';
import { BoardModel } from '../dashboard-models/board-model';

@Component({
    selector: 'app-form-edit-board',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    template: `
        <form
            [formGroup]="form"
            (ngSubmit)="onSubmit()"
            class="flex flex-col gap-4"
        >
            <fieldset
                class="du-fieldset bg-base-200 border-base-300 rounded-box border p-4"
            >
                <legend class="du-fieldset-legend">Edit Board</legend>

                <label class="du-label">Title</label>
                <input
                    type="text"
                    class="du-input"
                    placeholder="Board title"
                    formControlName="title"
                    [class.du-input-success]="
                        titleControl.valid && titleControl.touched
                    "
                    [class.du-input-warning]="
                        titleControl.invalid && titleControl.touched
                    "
                />
                @if (titleControl.touched && titleControl.invalid) {
                    @if (titleControl.errors?.['required']) {
                        <p class="text-warning">Title is required</p>
                    }
                    @if (titleControl.errors?.['minlength']) {
                        <p class="text-warning">
                            Title must be at least 3 characters
                        </p>
                    }
                    @if (titleControl.errors?.['maxlength']) {
                        <p class="text-warning">
                            Title must be at most 255 characters
                        </p>
                    }
                }
            </fieldset>

            <button
                type="submit"
                class="du-btn du-btn-primary"
                [disabled]="form.invalid"
            >
                Save Changes
            </button>
        </form>
    `,
})
export class FormEditBoardComponent {
    private fb = inject(FormBuilder);

    board = input.required<BoardModel>();
    boardUpdated = output<BoardModel>();

    titleControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
    ]);

    form = this.fb.group({
        id: new FormControl(0, { nonNullable: true }),
        title: this.titleControl,
    });

    constructor() {
        effect(() => {
            const l = this.board();
            if (l) {
                this.form.setValue({
                    id: l.id,
                    title: l.title,
                });
            }
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.boardUpdated.emit(this.form.getRawValue() as BoardModel);
        }
    }
}
