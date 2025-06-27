import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-delete-element-confirm',
    template: `
        <div class="flex flex-col gap-4">
            <h3 class="text-lg font-semibold">{{ title() }}</h3>
            <button (click)="onConfirm()" class="du-btn du-btn-outline du-btn-error gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
                {{ buttonText() }}
            </button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteElementConfirmComponent {
    title = input.required<string>();
    buttonText = input.required<string>();

    confirmDelete = output<void>();

    onConfirm(): void {
        this.confirmDelete.emit();
    }
}
