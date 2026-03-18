import {api} from "./api"

export const getTasks = async() => {
    const data = await api.get("/tasks/tasks")
    return data.data
}

export const createTask = async(task_name: string) => {
    const data = await api.post("tasks/tasks", {
        task_name
    })
    return data.data
}

export const updateTask = async(id:number, payload: {task_name?:string, concluded?:boolean} ) => {
    const data = await api.put(`tasks/${id}`, payload)
    return data.data
}

export const deleteTask = async(id:number) => {
    const data = await api.delete(`tasks/${id}`)
    return data.data
}

export const deleteConcludedTasks = async() => {
    const data = await api.delete(`tasks/tasks`)
    return data.data
}