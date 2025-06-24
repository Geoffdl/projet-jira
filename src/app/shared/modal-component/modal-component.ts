import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal-component',
  imports: [
    NgComponentOutlet
  ],
  template: `
    <button class="du-btn du-btn-xs du-btn-outline du-btn-info" onclick="my_modal_3.showModal()">{{ openBtnName() }}</button>
    <dialog id="my_modal_3" class="du-modal">
      <div class="du-modal-box">
        <form method="dialog">
          <button class="du-btn du-btn-sm du-btn-circle du-btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <ng-container *ngComponentOutlet="component()"></ng-container>

      </div>
    </dialog>
  `,
  styles: ``
})
export class ModalComponent {
  openBtnName = input('open');
  component = input<any>();

  openModal() {
    const dialog = document.getElementById(
      'my_modal_2',
    ) as HTMLDialogElement;
    dialog?.showModal();
  }
}

