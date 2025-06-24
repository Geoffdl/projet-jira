import { Component, computed, input, output } from '@angular/core';
import { ListComponent } from '../list-component/list-component';
import { ListModel } from '../dashboard-models/list-model';

@Component({
  selector: 'app-board-component',
  imports: [
    ListComponent
  ],
  template: `
    <p class="text-xl text-accent font-semibold">{{ title() }}</p>
    <br />
    <button (click)="addNewList()" class="du-btn du-btn-outline du-btn-sm du-btn-secondary mb-2">
      Create a new list
    </button>
    @if (isBoardEmpty()) {
      <p class="text-sm italic text-neutral-content">No list yet in {{ title() }}</p>
    }
    <div class="flex flex-row gap-4 ">
      @for (list of boardList(); track $index) {
        <div class="min-w-[250px]">
          <app-list-component [title]="boardList()[$index].title" [taskList]="boardList()[$index].taskList"
                              (newTaskEvent)="onTaskReceived($event)"></app-list-component>
        </div>
        <div class="du-divider du-divider-horizontal"></div>
      }
    </div>
  `,
  styles: ``
})
export class BoardComponent {
  title = input.required<string>();

  boardList = input<ListModel[]>([]);

  isBoardEmpty = computed(() => this.boardList().length === 0);

  sendNewTaskListTile = output<string>();

  sendNewList = output<string>();
  addNewList() {
    this.sendNewList.emit(this.title())
  }

  onTaskReceived(listTitle: string) {
    this.sendNewTaskListTile.emit(listTitle);
  }
}
