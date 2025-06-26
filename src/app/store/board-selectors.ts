import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board-state';
import { BoardModel } from '../features/dashboard/dashboard-models/board-model';

export const selectBoardState = createFeatureSelector<BoardState>('board');

export const selectBoards = createSelector(selectBoardState, (state) => state.boards);

export const selectBoardById = (id: number) =>
    createSelector(selectBoards, (boards) => {
        const found = boards.find((b) => b.id === id);
        if (found) {
            return found;
        }
        return null;
    });

export const selectListById = (listId: number) =>
    createSelector(selectBoards, (boards: BoardModel[]) => {
        for (const board of boards) {
            const found = board.lists.find((l) => l.id === listId);
            if (found) {
                return found;
            }
        }
        return null;
    });

export const selectTaskById = (taskId: number) =>
    createSelector(selectBoards, (boards: BoardModel[]) => {
        for (const board of boards) {
            for (const list of board.lists) {
                const found = list.tasks.find((t) => t.id === taskId);
                if (found) return found;
            }
        }
        return null;
    });

export const selectListsOfBoard = (boardId: number) =>
    createSelector(selectBoards, (boards: BoardModel[]) => {
        const board = boards.find((b) => b.id === boardId);
        if (!board) {
            console.warn(`Board with id ${boardId} not found`);
            return [];
        }
        return board.lists;
    });
