import { NgComponentOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-simple-modal',
    imports: [NgComponentOutlet],
    template: `
        <dialog id="{{ modalId() }}" #modalRef class="du-modal">
            <div class="du-modal-box bg-base-100 border-base-300 border">
                <form method="dialog">
                    <button class="du-btn du-btn-sm du-btn-circle du-btn-ghost absolute top-2 right-2">✕</button>
                </form>
                <ng-content></ng-content>
                <ng-container *ngComponentOutlet="component()"></ng-container>
            </div>
            <form method="dialog" class="du-modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    `,
    styles: ``,
})
export class SimpleModalComponent {
    /**
     * Can accept a dynamically injected component through
     * @ngComponentOutlet
     */
    component = input<any>();
    /**
     * Id for this modal to be targetted by open and close methods.
     * @modalId required id
     */
    modalId = input.required<string>();
    /**
     * Exposes the modal to open events for parent components
     */
    openModal = output();
}
