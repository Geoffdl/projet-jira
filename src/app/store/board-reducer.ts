// store/board.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { BoardActions } from './board-actions';
import { initialBoardState } from './board-state';

export const boardReducer = createReducer(
    initialBoardState,

    on(BoardActions.addBoard, (state, { board }) => ({
        ...state,
        boards: [...state.boards, board],
    })),

    on(BoardActions.addListToBoard, (state, { boardId, list }) => ({
        ...state,
        boards: state.boards.map((board) => (board.id === boardId ? { ...board, lists: [...board.lists, list] } : board)),
    })),

    on(BoardActions.addTaskToList, (state, { boardId, listId, task }) => ({
        ...state,
        boards: state.boards.map((board) =>
            board.id === boardId
                ? {
                      ...board,
                      lists: board.lists.map((list) => (list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list)),
                  }
                : board,
        ),
    })),

    on(BoardActions.updateTask, (state, { task }) => ({
        ...state,
        boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => {
                const hasTask = list.tasks.some((t) => t.id === task.id);
                return hasTask
                    ? {
                          ...list,
                          tasks: list.tasks.map((t) => (t.id === task.id ? { ...task } : t)),
                      }
                    : list;
            }),
        })),
    })),

    on(BoardActions.deleteTask, (state, { taskId }) => ({
        ...state,
        boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => ({
                ...list,
                tasks: list.tasks.filter((t) => t.id !== taskId),
            })),
        })),
    })),

    on(BoardActions.reorderTasks, (state, { boardId, listId, previousIndex, currentIndex }) => ({
        ...state,
        boards: state.boards.map((board) =>
            board.id === boardId
                ? {
                      ...board,
                      lists: board.lists.map((list) => {
                          if (list.id !== listId) return list;
                          const tasks = [...list.tasks];
                          const [moved] = tasks.splice(previousIndex, 1);
                          tasks.splice(currentIndex, 0, moved);
                          return { ...list, tasks };
                      }),
                  }
                : board,
        ),
    })),

    on(BoardActions.moveTaskBetweenLists, (state, { boardId, fromListId, toListId, task, toIndex }) => ({
        ...state,
        boards: state.boards.map((board) =>
            board.id === boardId
                ? {
                      ...board,
                      lists: board.lists.map((list) => {
                          if (list.id === fromListId) {
                              return {
                                  ...list,
                                  tasks: list.tasks.filter((t) => t.id !== task.id),
                              };
                          } else if (list.id === toListId) {
                              const tasks = [...list.tasks];
                              tasks.splice(toIndex, 0, task);
                              return { ...list, tasks };
                          }
                          return list;
                      }),
                  }
                : board,
        ),
    })),

    on(BoardActions.updateListTitle, (state, { boardId, listId, newTitle }) => ({
        ...state,
        boards: state.boards.map((board) =>
            board.id === boardId
                ? {
                      ...board,
                      lists: board.lists.map((list) => (list.id === listId ? { ...list, title: newTitle } : list)),
                  }
                : board,
        ),
    })),

    on(BoardActions.updateBoardTitle, (state, { boardId, newTitle }) => ({
        ...state,
        boards: state.boards.map((board) => (board.id === boardId ? { ...board, title: newTitle } : board)),
    })),
);
