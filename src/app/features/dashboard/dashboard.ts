import { Component, computed, effect, inject, signal } from '@angular/core';
import { ListModel } from './dashboard-models/list-model';
import { BoardComponent } from './board-component/board-component';
import { BoardModel } from './dashboard-models/board-model';
import { ModalComponent } from '../../shared/modal-component/modal-component';
import { TaskComponent } from './task-component/task-component';

import { FormBoardComponent } from './form-board-component/form-board-component';
import { AlertComponent } from '../../shared/alert-component/alert-component';
import { BoardDataService } from './board-data-service/board-data-service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [
    BoardComponent,
    ModalComponent,
    FormBoardComponent,
    RouterOutlet
    // BoardComponent,
    // ModalComponent,
    //
    // FormBoardComponent,
    // AlertComponent

  ],
  template: `
    <h1 class="text-4xl font-bold text-primary hover:text-accent pb-4">Dashboard</h1>

    <app-modal-component (openModal)="showModal()" [modalId]="modalId">
      <app-form-board-component (formResult)="handleFormResult($event)"></app-form-board-component>
    </app-modal-component>

    <button (click)="showModal()" class="du-btn du-btn-sm du-btn-secondary mb-4">
      Create a new board
    </button>

    <div class="flex flex-col gap-4">
      @for (board of boards(); track $index) {
        <div class="du-divider du-divider-accent/50 "></div>
        <app-board-component class="overflow-x-scroll max-h-96 overflow-y-scroll"
                             [boardId]="board.id"
        >
        </app-board-component>
      } @empty {
        <p class="text-sm italic text-neutral-content">No boards yet !</p>
      }
    </div>

    <!--    @if (alertMessage()) {-->
    <!--      <app-alert-component [description]="alertMessage()" (close)="alertMessage.set('')"></app-alert-component>-->
    <!--    }-->

    <router-outlet></router-outlet>

  `,
  styles: ``
})
export class Dashboard {

  private boardService = inject(BoardDataService);
  boards = computed(() => this.boardService.boards())

  modalId = 'modalId';


  showModal() {
    const dialog = (document.getElementById(this.modalId) as HTMLDialogElement);
    dialog.showModal();
  }
  addBoard(title:string){
    const newBoard : BoardModel = {
      id: Date.now(),
      title,
      lists : []
    }
    this.boardService.addBoard(newBoard);
  }
  handleFormResult(event: any) {
    this.addBoard(event.title)
    const dialog = (document.getElementById(this.modalId) as HTMLDialogElement)
    dialog.close();
  }
}
