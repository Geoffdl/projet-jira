import { Component, signal } from '@angular/core';
import { List } from '../list/list';
import { IListData } from '../IListData';
import { ITaskData } from '../ITaskData';

@Component({
  selector: 'app-board',
  imports: [
    List
  ],
  template: `
    <div class="container">
      <div class="mb-4">
        <button (click)="addNewList()" class="du-btn du-btn-primary">
          Add New List
        </button>
      </div>

      <div class="flex gap-4 overflow-x-auto">

        @for(list of taskLists(); track $index){
          <div class="flex-shrink-0 w-80">
            <app-list
              [listName]="list.name"
              [taskList]="list.tasks"
              (taskListChange)="updateListTasks($index, $event)">
            </app-list>
            <div class="mt-2 text-center">
              <button
                (click)="removeList($index)"
                class="du-btn du-btn-error du-btn-sm">
                Remove List
              </button>
            </div>
          </div>
        } @empty {
          <div class="text-center py-8">
            <p class="text-gray-500 mb-4">No lists yet. Add your first list!</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class Board {
  taskLists = signal<IListData[]>([
    {
      name: 'Todo List',
      tasks: [
        {
          title: 'Sample Task',
          description: 'This is a sample task',
          tag: 'example'
        }
      ]
    }
  ]);

  addNewList() {
    this.taskLists.update(lists => [
      ...lists,
      {
        name: `List ${lists.length + 1}`,
        tasks: []
      }
    ]);
  }

  removeList(index: number) {
    this.taskLists.update(currentLists => {
      return currentLists.filter((_list, i) => {
        return i !== index;

      });
    });
  }

  updateListTasks(index: number, newTasks: ITaskData[]) {
    this.taskLists.update(currentLists => {
      return currentLists.map((list, i) => {
        if (i === index) {
          return {
            ...list,
            tasks: newTasks
          };
        }
        return list;
      });
    });
  }



}
