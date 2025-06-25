import { Component, computed, inject, input, model, ModelSignal, output, Signal, signal } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';
import { BoardModel } from '../dashboard-models/board-model';
import { BoardDataService } from '../board-data-service/board-data-service';
import { ModalComponent } from '../../../shared/modal-component/modal-component';
import { FormBoardComponent } from '../form-board-component/form-board-component';
import { FormListComponent } from '../form-list-component/form-list-component';

// @ts-ignore
@Component({
  selector: 'app-board-component',
  imports: [
    ListComponent,
    ModalComponent,
    FormBoardComponent,
    FormListComponent
  ],
  template: `
    <!--    <p class="text-xl text-accent font-semibold">{{ title() }}</p>-->
    <!--    <br />-->


    <!--    <div class="flex flex-row gap-4 ">-->
    <!--      @for (listModel of listModels(); track $index) {-->
    <!--        <div class="min-w-[250px]">-->
    <!--          <app-list-component [list]="listModel"></app-list-component>-->
    <!--        </div>-->
    <!--      }-->
    <!--    </div>-->

    @if (board()) {
      <h1 class="text-xl text-accent font-semibold">{{ board()?.title }}</h1>

      <button (click)="openModal()" class="du-btn du-btn-outline du-btn-sm du-btn-secondary mb-2">
        Create a new list
      </button>
      <app-modal-component [modalId]="modalId" (openModal)="openModal()">
        <app-form-list-component (formResult)="handleFormResult($event)"></app-form-list-component>
      </app-modal-component>

      <div class="du-divider du-divider-accent"></div>
      <div class="flex flex-row">
        @for (list of board()?.boardList; track list.id) {
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

  boardId = input.required<number>();

  board = computed(() =>
    this.boardService.boards().find(b => b.id === this.boardId())
  );

  modalId = 'boardModal';

  addList(title: string) {
    const newList: ListModel = {
      id: Date.now(),
      title,
      taskList: []
    };
    this.boardService.addListToBoard(this.boardId(), newList);
  }

  openModal() {
    const dialog = (document.getElementById(this.modalId) as HTMLDialogElement);
    dialog.showModal();
  }

  handleFormResult(event: any) {

    this.addList(event.title);

    const dialog = (document.getElementById(this.modalId) as HTMLDialogElement)
    dialog.close();
  }
}
