import { computed, Injectable, signal } from '@angular/core';
import { BoardModel } from '../dashboard-models/board-model';
import { ListModel } from '../dashboard-models/list-model';
import { TaskModel } from '../dashboard-models/task-model';

@Injectable({ providedIn: 'root' })
export class BoardDataService {
  private readonly _boards = signal<BoardModel[]>([
    {
      id: 1,
      title: 'My First Board',
      lists: []
    }
  ]);

  boards = computed(() => this._boards());

  addListToBoard(boardId: number, newList: ListModel) {
    this._boards.update(boards =>
      boards.map(board =>
        board.id === boardId
          ? { ...board, lists: [...board.lists, newList] }
          : board
      )
    );
  }

  addTaskToList(boardId: number, listId: number, newTask: TaskModel) {
    this._boards.update(boards =>
      boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list =>
            list.id === listId
              ? { ...list, tasks: [...list.tasks, newTask] }
              : list
          )
        };
      })
    );
  }

  deleteTask(taskId: number) {
    this._boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => ({
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskId)
        }))
      }))
    );
  }

  addBoard(newBoard: BoardModel) {
    this._boards.update(boards => [...boards, newBoard]);
  }
}
