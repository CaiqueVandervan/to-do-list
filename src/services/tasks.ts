import { Task } from "@/models/Task"
import { api } from "./api"

export const getTasks = async (): Promise<Task[]> => {
    const data = await api.get<Task[]>("/tasks/tasks")
    return data.data
}

export const createTask = async (task_name: string): Promise<Task> => {
    const data = await api.post<Task>("/tasks/tasks", {
        task_name
    })
    return data.data
}

export const updateTask = async (id: number, payload: { task_name?: string, concluded?: boolean }): Promise<Task> => {
    const data = await api.put<Task>(`/tasks/${id}`, payload)
    return data.data
}

export const deleteTask = async (id: number): Promise<Task> => {
    const data = await api.delete<Task>(`/tasks/${id}`)
    return data.data
}

export const deleteConcludedTasks = async (): Promise<Task[]> => {
    const data = await api.delete<Task[]>(`/tasks/tasks`)
    return data.data
}