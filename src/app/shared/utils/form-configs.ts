import { Validators } from '@angular/forms';
import { FormConfig } from '../components/unified-form/unified-form.component';

export const TASK_FORM_CONFIG: FormConfig = {
    title: 'Task',
    submitLabel: 'Create Task',
    fields: [
        {
            key: 'title',
            label: 'Title',
            placeholder: 'Enter task title',
            validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        },
        {
            key: 'description',
            label: 'Description',
            placeholder: 'Enter task description',
            validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        },
        {
            key: 'tag',
            label: 'Tag',
            placeholder: 'Enter task tag',
            validators: [Validators.required, Validators.minLength(1), Validators.maxLength(25)],
        },
    ],
};

export const LIST_FORM_CONFIG: FormConfig = {
    title: 'List',
    submitLabel: 'Create List',
    fields: [
        {
            key: 'title',
            label: 'List Name',
            placeholder: 'Enter list name',
            validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        },
    ],
};

export const BOARD_FORM_CONFIG: FormConfig = {
    title: 'Board',
    submitLabel: 'Create Board',
    fields: [
        {
            key: 'title',
            label: 'Board Name',
            placeholder: 'Enter board name',
            validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        },
    ],
};
