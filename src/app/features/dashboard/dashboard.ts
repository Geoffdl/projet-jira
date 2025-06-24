import { Component } from '@angular/core';
import { ListModel } from './dashboard-models/list-model';
import { BoardComponent } from './board-component/board-component';


@Component({
  selector: 'app-dashboard',
  imports: [
    BoardComponent

  ],
  template: `
    <h1 class="text-6xl text-primary hover:text-accent pb-8">Dashboard</h1>
    <button (click)="addNewBoard()" class="du-btn du-btn-sm du-btn-secondary">
      Create a new board
    </button>
    <div class="flex flex-col h-screen">
      <div class="flex-1">
        <app-board-component [title]="bName1" [boardList]="starterData1"></app-board-component>
      </div>
      <div class="flex-1 ">
        <app-board-component [title]="bName2" [boardList]="starterData2"></app-board-component>
      </div>
      <div class="flex-1">
        <app-board-component [title]="bName3"></app-board-component>
      </div>
    </div>
  `,
  styles: ``
})
export class Dashboard {
  bName1: string = 'Board-1';
  bName2: string = 'Board-2';
  bName3: string = 'Board-3';
  starterData1: ListModel[] = [{
    title: 'L-1',
    taskList: [{ title: 'task-1', description: 'ss', tag: 'oo' }, { title: 'task-2', description: 'ss', tag: 'oo' }]
  }, {
    title: 'L-2',
    taskList: [{ title: 'task-1', description: 'ss', tag: 'oo' }, { title: 'task-2', description: 'ss', tag: 'oo' }]
  }];

  starterData2: ListModel[] = [{
    title: 'L-1', taskList: []
  }, { title: 'L-2', taskList: [] }];

  addNewBoard() {

  }
}
