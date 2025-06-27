import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BoardModel, ListModel, TaskModel } from '../../shared/types/board.types';

export const BoardActions = createActionGroup({
    source: 'Board',
    events: {
        'Add Board': props<{ board: BoardModel }>(),
        'Add List To Board': props<{ boardId: number; list: ListModel }>(),
        'Add Task To List': props<{
            boardId: number;
            listId: number;
            task: TaskModel;
        }>(),
        'Update Task': props<{ task: TaskModel }>(),
        'Delete Task': props<{ taskId: number }>(),
        'Delete List': props<{ boardId: number; listId: number }>(),
        'Delete Board': props<{ boardId: number }>(),
        'Reorder Tasks': props<{
            boardId: number;
            listId: number;
            previousIndex: number;
            currentIndex: number;
        }>(),
        'Move Task Between Lists': props<{
            boardId: number;
            fromListId: number;
            toListId: number;
            task: TaskModel;
            toIndex: number;
        }>(),
        'Update List Title': props<{
            boardId: number;
            listId: number;
            newTitle: string;
        }>(),
        'Update Board Title': props<{
            boardId: number;
            newTitle: string;
        }>(),
    },
});
