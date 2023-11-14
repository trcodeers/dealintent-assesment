

export interface TaskData{
    name: string,
    description: string,
    date?: string
}

export interface TaskItem extends TaskData{
    id: string,
    name: string,
    description: string,
    date?: string
}
