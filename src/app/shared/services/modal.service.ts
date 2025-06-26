import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    openModal(modalId: string): void {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }

    closeModal(modalId: string): void {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    }

    isModalOpen(modalId: string): boolean {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        return dialog?.hasAttribute('open') || false;
    }
}
