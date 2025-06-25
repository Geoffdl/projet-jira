import { Component, computed, inject, input, model, ModelSignal, output, Signal, signal } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormListComponent } from '../form-list-component/form-list-component';
import { Router } from '@angular/router';
import { FormEditBoardComponent } from "../form-board-component/form-edit-board-component";
import { BoardModel } from '../dashboard-models/board-model';

// @ts-ignore
@Component({
  selector: 'app-board-component',
  imports: [
    ListComponent,
    ModalComponent,
    FormListComponent,
    FormEditBoardComponent
],
  template: `
@if (board()) {
  <div class="bg-base-200 rounded-xl p-6 shadow-md space-y-6">
    <div class="flex items-center justify-between">
      <h1 (click)="goToBoardDetails()"
          class="text-2xl text-accent font-semibold hover:text-secondary hover:cursor-pointer transition-colors underline">
        {{ board()?.title }}
        <button (click)="openEditTitleModal()" class="du-btn du-btn-sm du-btn-ghost p-1" aria-label="Edit list title" title="Edit list title">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
</svg>
  </button>
      </h1>

      <button (click)="openModal()" class="du-btn du-btn-secondary du-btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        New list
      </button>
    </div>

    <app-modal-component [modalId]="modalId()" (openModal)="openModal()">
      <app-form-list-component (formResult)="handleFormResult($event)"></app-form-list-component>
    </app-modal-component>

    <div class="flex gap-6 overflow-x-auto pb-4">
      @for (list of board()?.lists; track list.id) {
        <div class="flex-shrink-0 min-w-80">
          <app-list-component [list]="list" [boardId]="boardId()"></app-list-component>
        </div>
        @if (!$last) {
          <div class="du-divider du-divider-horizontal opacity-30"></div>
        }
      } @empty {
        <div class="flex-1 text-center py-12">
          <p class="text-base-content/60 italic">No lists yet in {{ board()?.title }}</p>
        </div>
      }
    </div>
  </div>
} @else {
  <div class="text-center py-12">
    <p class="text-base-content/60 italic">No board found</p>
  </div>
}
@if (board()) {
<app-modal-component [modalId]="editTitleModalId()" >
  <app-form-edit-board [board]="currentBoard" (boardUpdated)="handleEditForm($event)"></app-form-edit-board>
</app-modal-component>
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

  //edit
  get currentBoard(): BoardModel {
    const b = this.board();
    if (!b) throw new Error("Board is undefined");
    return b;
  }
  editTitle = signal('');

  editTitleModalId = computed(() => {
    const board = this.board();
    if (!board) return 'modal-edit-title-board-unknown';
    return `modal-edit-title-board-${board.id}`;
  });

  openEditTitleModal() {
    const board = this.board();
    if (!board) return;
    this.editTitle.set(board.title);
    const dialog = document.getElementById(`modal-edit-title-board-${board.id}`) as HTMLDialogElement;
    dialog?.showModal();
  }

  closeEditTitleModal() {
    const dialog = document.getElementById(this.editTitleModalId()) as HTMLDialogElement;
    dialog.close();
  }
  handleEditForm(updatedBoard: BoardModel) {
    this.boardService.updateBoardTitle(this.boardId(), updatedBoard.title);
    this.closeEditTitleModal();
    }
  }
