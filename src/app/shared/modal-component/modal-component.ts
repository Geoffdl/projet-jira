import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal-component',
  imports: [
    NgComponentOutlet
  ],
  template: `

    <dialog id="{{modalId()}}" #modalRef class="du-modal">
      <div class="du-modal-box">
        <ng-content></ng-content>
        <ng-container *ngComponentOutlet="component()"></ng-container>
      </div>
      <form method="dialog" class="du-modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  styles: ``
})
export class ModalComponent {
  component = input<any>();

  modalId = input.required<string>();

  openModal = output();
}

