import { dataBase } from "@/lib/dataBase";
import { NextApiRequest, NextApiResponse } from "next";

export async function deleteTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.query
            const [resp] = await dataBase.query("DELETE FROM todolist WHERE id = ?", [id])
            res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export async function editTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            const { id } = req.query
            const idNumber = Number(id)
            const { task_name } = req.body
            const [resp] = await dataBase.query("UPDATE todolist SET task_name = ? WHERE id = ?", [task_name, idNumber])
            res.status(200).json(resp)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export async function concludedTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            const {id} = req.query
            const idNumber = Number(id)
            const {task_name, concluded} = req.body

            const fields: string[] = []
            const values = []

            

            const resp = await dataBase.query("UPDATE tasks SET concluded = ? WHERE id = ?", [concluded, idNumber])
            res.status(200).json(resp)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        await deleteTasks(req, res)
    }
    if (req.method === "PUT") {
        await editTasks(req, res)
        await concludedTasks(req, res)
    }
}