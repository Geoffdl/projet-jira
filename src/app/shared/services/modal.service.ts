import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Centralises modal operations (open/close events)
 */
export class ModalService {
    /**
     * Converts a modal id into an interactive dialog element in order to acces its open method
     * @param modalId The given id for the modal
     */
    openModal(modalId: string): void {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }
    }
    /**
     * Converts a modal id into an interactive dialog element in order to acces its close method
     * @param modalId The given id for the modal
     */
    closeModal(modalId: string): void {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        if (dialog) {
            dialog.close();
        }
    }
    /**
     * Converts a modal id into an interactive dialog element in order to check if the modal is already open
     * @param modalId The given id for the modal
     */
    isModalOpen(modalId: string): boolean {
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        return dialog?.hasAttribute('open') || false;
    }
}
