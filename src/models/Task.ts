import { RowDataPacket } from "mysql2"

export interface Task {
    id: number
    task_name: string
    concluded: boolean
    created_at: string
}

export type TaskExtended = Task & RowDataPacket