import { Component, computed, inject, input, model, ModelSignal, output, Signal, signal } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormListComponent } from '../form-list-component/form-list-component';
import { Router } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-board-component',
  imports: [
    ListComponent,
    ModalComponent,
    FormListComponent
  ],
  template: `

    @if (board()) {
      <h1 (click)="goToBoardDetails()" class="text-xl text-accent font-semibold hover:text-secondary">{{ board()?.title }}</h1>

      <button (click)="openModal()" class="du-btn du-btn-outline du-btn-sm du-btn-secondary mb-2">
        Create a new list
      </button>
      <app-modal-component [modalId]="modalId()" (openModal)="openModal()">
        <app-form-list-component (formResult)="handleFormResult($event)"></app-form-list-component>
      </app-modal-component>

      <div class="flex flex-row">
        @for (list of board()?.lists; track list.id) {
          <app-list-component [list]="list" [boardId]="boardId()"></app-list-component>
          <div class="du-divider du-divider-horizontal"></div>
        } @empty {
          <p class="text-sm italic text-neutral-content">No list yet in {{ board()?.title }}</p>
        }
      </div>

    } @else {
      <p class="text-sm italic text-neutral-content">No board found</p>
    }

  `,
  styles: ``
})
export class BoardComponent {

  private boardService = inject(BoardDataService);
  private router = inject(Router);
  boardId = input.required<number>();

  board = computed(() =>
    this.boardService.boards().find(b => b.id === this.boardId())
  );

  modalId = computed(() => `modal-board-${this.boardId()}`);

  addList(title: string) {
    const newList: ListModel = {
      id: Date.now(),
      title,
      tasks: []
    };
    this.boardService.addListToBoard(this.boardId(), newList);
  }

  openModal() {
    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement);
    dialog.showModal();
  }


  handleFormResult(event: any) {

    this.addList(event.title);

    const dialog = (document.getElementById(this.modalId()) as HTMLDialogElement)
    dialog.close();
  }
  goToBoardDetails() {
    this.router.navigate(['/board', this.boardId()]);
  }
}
