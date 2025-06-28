import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardModel, ListModel, TaskModel } from '../../shared/types/board.types';
import { BoardState } from './board.state';

export const selectBoardState = createFeatureSelector<BoardState>('board');

export const selectBoards = createSelector(selectBoardState, (state: BoardState) => state.boards);

export const selectBoardById = (id: number) =>
    createSelector(selectBoards, (boards: BoardModel[]): BoardModel | null => boards.find((board) => board.id === id) ?? null);

export const selectAllBoards = () =>
    createSelector(selectBoards, (boards: BoardModel[]): BoardModel[] => {
        return boards;
    });
export const selectAllLists = () =>
    createSelector(selectBoards, (boards: BoardModel[]): ListModel[] => {
        return boards.flatMap((b) => b.lists);
    });

export const selectListById = (listId: number) =>
    createSelector(selectBoards, (boards: BoardModel[]): ListModel | null => {
        for (const board of boards) {
            const list = board.lists.find((l) => l.id === listId);
            if (list) return list;
        }
        return null;
    });

export const selectTaskById = (taskId: number) =>
    createSelector(selectBoards, (boards: BoardModel[]): TaskModel | null => {
        for (const board of boards) {
            for (const list of board.lists) {
                const task = list.tasks.find((t) => t.id === taskId);
                if (task) return task;
            }
        }
        return null;
    });

export const selectListsOfBoard = (boardId: number) =>
    createSelector(selectBoardById(boardId), (board: BoardModel | null): ListModel[] => {
        if (!board) {
            console.warn(`Board with id ${boardId} not found`);
            return [];
        }
        return board.lists;
    });

export const selectTasksOfList = (listId: number) => createSelector(selectListById(listId), (list: ListModel | null): TaskModel[] => list?.tasks ?? []);

export const selectBoardsCount = createSelector(selectBoards, (boards: BoardModel[]): number => boards.length);

export const selectTotalTasksCount = createSelector(selectBoards, (boards: BoardModel[]): number =>
    boards.reduce((total, board) => total + board.lists.reduce((listTotal, list) => listTotal + list.tasks.length, 0), 0),
);
