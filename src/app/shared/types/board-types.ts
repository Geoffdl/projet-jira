export interface BoardModel {
    id: number;
    title: string;
    lists: ListModel[];
}

export interface ListModel {
    id: number;
    title: string;
    tasks: TaskModel[];
}
export interface TaskModel {
    id: number;
    title: string;
    description: string;
    tag: string;
}
