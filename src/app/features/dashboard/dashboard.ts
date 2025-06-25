import { Component, effect, signal } from '@angular/core';
import { ListModel } from './dashboard-models/list-model';
import { BoardComponent } from './board-component/board-component';
import { BoardModel } from './dashboard-models/board-model';
import { ModalComponent } from '../../shared/modal-component/modal-component';
import { TaskComponent } from './task-component/task-component';

import { FormDashboardComponent } from './form-dashboard-component/form-dashboard-component';
import { AlertComponent } from '../../shared/alert-component/alert-component';


@Component({
  selector: 'app-dashboard',
  imports: [
    BoardComponent,
    ModalComponent,

    FormDashboardComponent,
    AlertComponent

  ],
  template: `
    <h1 class="text-4xl font-bold text-primary hover:text-accent pb-4">Dashboard</h1>

    <app-modal-component (openModal)="showModal()">
      <app-form-dashboard-component (formResult)="handleFormResult($event)"></app-form-dashboard-component>
    </app-modal-component>

    <button (click)="showModal()" class="du-btn du-btn-sm du-btn-secondary mb-4">
      Create a new board
    </button>

    <div class="flex flex-col gap-4">
      @for (board of boards(); track $index) {
        <div class="du-divider-accent/50 du-divider"></div>
        <app-board-component class="overflow-x-scroll max-h-96 overflow-y-scroll"
                             [title]="board.title"
                             [boardList]="board.boardList"
                             (sendNewTaskListTile)="addNewTask($event)"
                             (sendNewList)="addNewList($event)">
        </app-board-component>

      }
    </div>

    @if (alertMessage()) {
      <app-alert-component [description]="alertMessage()" (close)="alertMessage.set('')"></app-alert-component>
    }


  `,
  styles: ``
})
export class Dashboard {
  starterData1: ListModel[] = [{
    title: 'L-1',
    taskList: [{ title: 'task-1', description: 'ss', tag: 'oo' }, { title: 'task-2', description: 'ss', tag: 'oo' }]
  }, {
    title: 'L-2',
    taskList: [{ title: 'task-3', description: 'ss', tag: 'oo' }, { title: 'task-4', description: 'ss', tag: 'oo' }]
  }];

  starterData2: ListModel[] = [{
    title: 'L-3', taskList: []
  }, { title: 'L-4', taskList: [] }];

  boards = signal<BoardModel[]>([
    { title: 'Board-1', boardList: this.starterData1 },
    { title: 'Board-2', boardList: this.starterData2 },
    { title: 'Board-3', boardList: [] }
  ]);

  //

  alertMessage = signal<string>('');

  constructor() {

    this.init();

  }
  init(){
    effect(() => {
      const currentBoards = this.boards();
      const totalBoards = currentBoards.length;
      this.showAlert(`Board added. Total number : ${totalBoards}`)
    });
  }

  showAlert(message: string) {
    this.alertMessage.set(message);
  }
  //


  addNewBoard(title: string): void {
    this.boards.update(current => [...current, { title: title, boardList: [] }]);
  }

  addNewTask(listTitle: string) {
    this.boards.update(current => {
      return current.map(board => {
        const updatedLists = board.boardList.map(list => {
          if (list.title === listTitle) {
            return {
              ...list,
              taskList: [
                ...list.taskList,
                {
                  title: 'New Task',
                  description: '',
                  tag: ''
                }
              ]
            };
          } else {
            return list;
          }
        });

        return {
          ...board,
          boardList: updatedLists
        };
      });
    });
  }

  addNewList(boardTitle: string) {
    this.boards.update(currentBoards => {
      return currentBoards.map(board => {
        if (board.title === boardTitle) {
          const updatedBoardList = [
            ...board.boardList,
            {
              title: `List-${board.boardList.length + 1}`,
              taskList: []
            }
          ];
          return {
            ...board,
            boardList: updatedBoardList
          };
        } else {
          return board;
        }
      });
    });
  }

  protected readonly TaskComponent = TaskComponent;



  showModal() :void {
    let modal = (document.getElementById('my_modal') as HTMLDialogElement);
    modal.showModal();
  }

  handleFormResult(title: any): void {
    this.addNewBoard(title.toString());
    let modal = (document.getElementById('my_modal') as HTMLDialogElement);
    modal.close()
  }
}
