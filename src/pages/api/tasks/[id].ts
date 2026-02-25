import { dataBase } from "@/lib/dataBase";
import { NextApiRequest, NextApiResponse } from "next";

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
            const { id } = req.query
            const idNumber = Number(id)
            const { task_name, concluded } = req.body

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

    const { id } = req.query
    const idNum = Number(id)

    if (req.method === "DELETE") {
        try {
            const [resp] = await dataBase.query("DELETE FROM todolist WHERE id = ?", [idNum])
            res.status(200).json(resp)
        } catch (error) {
            res.status(500).json(error)
        }
    }


    if (req.method === "PUT") {
        try {
            const { task_name, concluded } = req.body

            const fields: string[] = []
            const values: any[] = []

            if (typeof task_name === "string") {
                fields.push("task_name = ?")
                values.push(task_name)
            }
            if (typeof concluded === "boolean") {
                fields.push("concluded = ?")
                values.push(concluded)
            }
            values.push(idNum)
            const [resp] = await dataBase.query(`UPDATE todolist SET ${fields.join(", ")} WHERE id = ?`, values)
            res.status(200).json(resp)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}