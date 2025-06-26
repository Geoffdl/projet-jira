import { ListModel } from './list-model';

export interface BoardModel {
    id: number;
    title: string;
    lists: ListModel[];
}
