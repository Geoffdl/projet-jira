// store/board.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { BoardActions } from './board.actions';
import { initialBoardState, BoardState } from './board.state';
import { BoardModel, ListModel } from '../../shared/types/board.types';

const updateBoardById = (boards: BoardModel[], boardId: number, updateFn: (board: BoardModel) => BoardModel): BoardModel[] => {
    return boards.map((board) => (board.id === boardId ? updateFn(board) : board));
};

const updateListInBoard = (board: BoardModel, listId: number, updateFn: (list: ListModel) => ListModel): BoardModel => {
    return {
        ...board,
        lists: board.lists.map((list) => (list.id === listId ? updateFn(list) : list)),
    };
};

const findTaskInBoards = (
    boards: BoardModel[],
    taskId: number,
): {
    boardIndex: number;
    listIndex: number;
    taskIndex: number;
} | null => {
    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
        const board = boards[boardIndex];
        for (let listIndex = 0; listIndex < board.lists.length; listIndex++) {
            const list = board.lists[listIndex];
            const taskIndex = list.tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                return { boardIndex, listIndex, taskIndex };
            }
        }
    }
    return null;
};

export const boardReducer = createReducer(
    initialBoardState,

    on(BoardActions.addBoard, (state, { board }): BoardState => {
        if (state.boards.some((b) => b.id === board.id)) {
            console.warn(`Board with ID ${board.id} already exists`);
            return state;
        }
        return {
            ...state,
            boards: [...state.boards, board],
        };
    }),

    on(
        BoardActions.addListToBoard,
        (state, { boardId, list }): BoardState => ({
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) => ({
                ...board,
                lists: [...board.lists, list],
            })),
        }),
    ),

    on(
        BoardActions.addTaskToList,
        (state, { boardId, listId, task }): BoardState => ({
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) =>
                updateListInBoard(board, listId, (list) => ({
                    ...list,
                    tasks: [...list.tasks, task],
                })),
            ),
        }),
    ),

    on(BoardActions.updateTask, (state, { task }): BoardState => {
        const taskLocation = findTaskInBoards(state.boards, task.id);
        if (!taskLocation) {
            console.warn(`Task with ID ${task.id} not found`);
            return state;
        }

        return {
            ...state,
            boards: state.boards.map((board, boardIndex) =>
                boardIndex === taskLocation.boardIndex
                    ? {
                          ...board,
                          lists: board.lists.map((list, listIndex) =>
                              listIndex === taskLocation.listIndex
                                  ? {
                                        ...list,
                                        tasks: list.tasks.map((t) => (t.id === task.id ? task : t)),
                                    }
                                  : list,
                          ),
                      }
                    : board,
            ),
        };
    }),

    on(BoardActions.deleteTask, (state, { taskId }): BoardState => {
        const taskLocation = findTaskInBoards(state.boards, taskId);
        if (!taskLocation) {
            console.warn(`Task with ID ${taskId} not found`);
            return state;
        }

        return {
            ...state,
            boards: state.boards.map((board, boardIndex) =>
                boardIndex === taskLocation.boardIndex
                    ? {
                          ...board,
                          lists: board.lists.map((list, listIndex) =>
                              listIndex === taskLocation.listIndex
                                  ? {
                                        ...list,
                                        tasks: list.tasks.filter((t) => t.id !== taskId),
                                    }
                                  : list,
                          ),
                      }
                    : board,
            ),
        };
    }),

    on(BoardActions.reorderTasks, (state, { boardId, listId, previousIndex, currentIndex }): BoardState => {
        if (previousIndex === currentIndex) return state;

        return {
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) =>
                updateListInBoard(board, listId, (list) => {
                    if (previousIndex < 0 || previousIndex >= list.tasks.length || currentIndex < 0 || currentIndex >= list.tasks.length) {
                        console.warn('Invalid task indices for reordering');
                        return list;
                    }

                    const tasks = [...list.tasks];
                    const [moved] = tasks.splice(previousIndex, 1);
                    tasks.splice(currentIndex, 0, moved);
                    return { ...list, tasks };
                }),
            ),
        };
    }),

    on(BoardActions.moveTaskBetweenLists, (state, { boardId, fromListId, toListId, task, toIndex }): BoardState => {
        if (fromListId === toListId) {
            console.warn('Source and destination lists are the same');
            return state;
        }

        return {
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) => ({
                ...board,
                lists: board.lists.map((list) => {
                    if (list.id === fromListId) {
                        return {
                            ...list,
                            tasks: list.tasks.filter((t) => t.id !== task.id),
                        };
                    } else if (list.id === toListId) {
                        const tasks = [...list.tasks];
                        const safeIndex = Math.max(0, Math.min(toIndex, tasks.length));
                        tasks.splice(safeIndex, 0, task);
                        return { ...list, tasks };
                    }
                    return list;
                }),
            })),
        };
    }),

    on(BoardActions.updateListTitle, (state, { boardId, listId, newTitle }): BoardState => {
        if (!newTitle.trim()) {
            console.warn('List title cannot be empty');
            return state;
        }

        return {
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) =>
                updateListInBoard(board, listId, (list) => ({
                    ...list,
                    title: newTitle.trim(),
                })),
            ),
        };
    }),

    on(BoardActions.updateBoardTitle, (state, { boardId, newTitle }): BoardState => {
        if (!newTitle.trim()) {
            console.warn('Board title cannot be empty');
            return state;
        }

        return {
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) => ({
                ...board,
                title: newTitle.trim(),
            })),
        };
    }),

    on(BoardActions.deleteList, (state, { boardId, listId }): BoardState => {
        return {
            ...state,
            boards: updateBoardById(state.boards, boardId, (board) => ({
                ...board,
                lists: board.lists.filter((list) => list.id !== listId),
            })),
        };
    }),

    on(BoardActions.deleteBoard, (state, { boardId }): BoardState => {
        return {
            ...state,
            boards: state.boards.filter((board) => board.id !== boardId),
        };
    }),
);
