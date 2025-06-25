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
  <div class="bg-base-200 rounded-xl p-6 shadow-md space-y-6">
    <div class="flex items-center justify-between">
      <h1 (click)="goToBoardDetails()"
          class="text-2xl text-accent font-semibold hover:text-secondary hover:cursor-pointer transition-colors underline">
        {{ board()?.title }}
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
