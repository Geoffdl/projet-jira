import { TaskModel } from './task-model';

export interface ListModel {
    id: number;
    title: string;
    tasks: TaskModel[];
}
