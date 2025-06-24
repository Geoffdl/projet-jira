import { Component, computed, input } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';

@Component({
  selector: 'app-board-component',
  imports: [
    ListComponent
  ],
  template: `

    <p class="text-xl text-accent"> {{title()}} </p>
    <br/>
    <button (click)="addNewList()" class="du-btn du-btn-outline du-btn-sm du-btn-secondary">
      Create a new list
    </button>
    @if(isBoardEmpty()){
      <p>No list yet in {{title()}}</p>
    }

    <div class="flex flex-row">
    @for (list of boardList(); track $index) {
      <div class="min-w-1/4">
      <app-list-component [title]=boardList()[$index].title [taskList]="boardList()[$index].taskList"></app-list-component>
      </div>
    }
    </div>

  `,
  styles: ``
})
export class BoardComponent {
  title = input.required<string>();

  boardList = input<ListModel[]>([]);

  isBoardEmpty = computed(() => this.boardList().length === 0);

  addNewList() {

  }
}
