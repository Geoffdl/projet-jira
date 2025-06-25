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
      lists: [{
        id: 0,
        title: 'TODO',
        tasks: [{
          id: 0,
          title: 'Tips',
          description: 'Double clicking allows you to edit anywhere!',
          tag: 'essential'
        },{
          id: 1,
          title: 'Tips',
          description: 'You can right click on me to delete!',
          tag: 'info'
        },{
          id: 2,
          title: 'Tips',
          description: 'Try to Drag&Drop a task!',
          tag: 'info'
        }]
      }, {
        id: 1,
        title: 'PENDING',
        tasks: []
      }, {
        id: 2,
        title: 'DONE',
        tasks: []
      }]
    },{
      id: 2,
      title: 'Some Other Board',
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

  updateTask(updatedTask: TaskModel) {
    this._boards.update(boards =>
      boards.map(board => ({
        ...board,
        lists: board.lists.map(list => {
          const hasTask = list.tasks.some(task => task.id === updatedTask.id);
          return hasTask
            ? {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === updatedTask.id ? { ...updatedTask } : { ...task }
                )
              }
            : list;
        })
      }))
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
  reorderTasksInList(boardId: number, listId: number, previousIndex: number, currentIndex: number) {
    this._boards.update(boards =>
      boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id !== listId) return list;
            const tasks = [...list.tasks];
            const [movedTask] = tasks.splice(previousIndex, 1);
            tasks.splice(currentIndex, 0, movedTask);
            return { ...list, tasks };
          })
        };
      })
    );
  }

  moveTaskBetweenLists(boardId: number, fromListId: number, toListId: number, task: TaskModel, toIndex: number) {
    this._boards.update(boards =>
      boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === fromListId) {
              return { ...list, tasks: list.tasks.filter(t => t.id !== task.id) };
            } else if (list.id === toListId) {
              const tasks = [...list.tasks];
              tasks.splice(toIndex, 0, task);
              return { ...list, tasks };
            }
            return list;
          })
        };
      })
    );
  }


  updateListTitle(boardId: number, listId: number, newTitle: string) {
    const board = this.boards().find(b => b.id === boardId);
    if (!board) return;
    const list = board.lists.find(l => l.id === listId);
    if (list) {
      list.title = newTitle;
    }
  }

  updateBoardTitle(boardId: number, newTitle: string) {
    const board = this.boards().find(b => b.id === boardId);
    if (!board) return;
    board.title = newTitle;
  }
}
