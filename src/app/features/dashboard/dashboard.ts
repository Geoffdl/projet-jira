import { Component, signal } from '@angular/core';
import { ListModel } from './dashboard-models/list-model';
import { BoardComponent } from './board-component/board-component';
import { BoardModel } from './dashboard-models/board-model';


@Component({
  selector: 'app-dashboard',
  imports: [
    BoardComponent

  ],
  template: `
    <h1 class="text-4xl font-bold text-primary hover:text-accent pb-4">Dashboard</h1>
    <button (click)="addNewBoard()" class="du-btn du-btn-sm du-btn-secondary mb-4">
      Create a new board
    </button>
    <div class="flex flex-col gap-4">
      @for(board of boards();track $index){
        <div class="du-divider-accent/50 du-divider"></div>
        <app-board-component
          [title]="board.title"
          [boardList]="board.boardList"
        (sendNewTaskListTile)="onTaskReceived($event)"
        (sendNewList)="onNewListReceived($event)">
        </app-board-component>

      }
    </div>


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

  addNewBoard() {
    this.boards.update(current => [...current, { title: `Board-${current.length + 1}`, boardList: [] }]);
  }

  onTaskReceived(listTitle: string) {
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
                  tag: '',
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

  onNewListReceived(boardTitle: string) {
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
}
