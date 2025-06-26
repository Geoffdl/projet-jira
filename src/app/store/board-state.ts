import { BoardModel } from '../shared/types/board-types';

export interface BoardState {
    boards: BoardModel[];
}

export const initialBoardState: BoardState = {
    boards: [
        {
            id: 1,
            title: 'My First Board',
            lists: [
                {
                    id: 0,
                    title: 'TODO',
                    tasks: [
                        {
                            id: 0,
                            title: 'Tips',
                            description: 'Double clicking allows you to edit anything!',
                            tag: 'essential',
                        },
                        {
                            id: 1,
                            title: 'Tips',
                            description: 'You can right click on me to delete!',
                            tag: 'info',
                        },
                        {
                            id: 2,
                            title: 'Tips',
                            description: 'Try to Drag&Drop a task!',
                            tag: 'info',
                        },
                    ],
                },
                {
                    id: 1,
                    title: 'PENDING',
                    tasks: [
                        {
                            id: 3,
                            title: 'Tips',
                            description: 'Right clicking allows you to delete anything!',
                            tag: 'essential',
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'DONE',
                    tasks: [],
                },
            ],
        },
        {
            id: 2,
            title: 'Some Other Board',
            lists: [],
        },
    ],
};
