import { dataBase } from "@/lib/dataBase"
import { NextApiRequest, NextApiResponse } from "next"
import { ResultSetHeader } from "mysql2"
import { TaskExtended } from "@/models/Task"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const [resp] = await dataBase.query<TaskExtended[]>("SELECT * FROM tasks")
            res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    if (req.method === "POST") {
        try {
            const { task_name } = req.body
            const [resp] = await dataBase.query<ResultSetHeader>("INSERT INTO tasks (task_name, concluded) VALUES (?, ?)", [task_name, false])

            const [newTask] = await dataBase.query<TaskExtended[]>("SELECT * FROM tasks WHERE id = ?", [resp.insertId])

            res.status(200).json(newTask[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    if (req.method === "DELETE") {
        try {

            const [tasks] = await dataBase.query<TaskExtended[]>("SELECT * FROM tasks WHERE concluded = 1")

            await dataBase.query<ResultSetHeader>("DELETE FROM tasks WHERE concluded = 1")
            res.status(200).json(tasks)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }
}