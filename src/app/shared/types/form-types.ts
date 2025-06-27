// Form data types - these represent the actual form values
export interface TaskFormData {
    title: string;
    description: string;
    tag: string;
}

export interface TaskEditFormData extends TaskFormData {
    id: number;
}

export interface ListFormData {
    title: string;
}

export interface ListEditFormData extends ListFormData {
    id: number;
}

export interface BoardFormData {
    title: string;
}

export interface BoardEditFormData extends BoardFormData {
    id: number;
}

// Form result types - what gets emitted from forms
export type TaskFormResult = TaskFormData;
export type TaskEditFormResult = TaskEditFormData;
export type ListFormResult = ListFormData;
export type ListEditFormResult = ListEditFormData;
export type BoardFormResult = BoardFormData;
export type BoardEditFormResult = BoardEditFormData;
