import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-modal-component',
    imports: [NgComponentOutlet],
    template: `
        <dialog id="{{ modalId() }}" #modalRef class="du-modal">
            <div class="du-modal-box bg-base-100 border-base-300 border">
                <form method="dialog">
                    <button
                        class="du-btn du-btn-sm du-btn-circle du-btn-ghost absolute top-2 right-2"
                    >
                        ✕
                    </button>
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
export class ModalComponent {
    component = input<any>();

    modalId = input.required<string>();

    openModal = output();
}
