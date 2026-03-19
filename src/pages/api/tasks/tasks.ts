import { dataBase } from "@/lib/dataBase"
import { NextApiRequest, NextApiResponse } from "next"
import { ResultSetHeader } from "mysql2"
import { Task } from "@/models/Task"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const [resp] = await dataBase.query("SELECT * FROM tasks")
            res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    if (req.method === "POST") {
        try {
            const { task_name } = req.body
            const [resp] = await dataBase.query<ResultSetHeader>("INSERT INTO tasks (task_name, concluded) VALUES (?, ?)", [task_name, false])

            const [newTask] = await dataBase.query<any>("SELECT * FROM tasks WHERE id = ?", [resp.insertId])

            res.status(200).json(newTask[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    if (req.method === "DELETE") {
        try {
            const [resp] = await dataBase.query("DELETE FROM tasks WHERE concluded = 1")
            res.status(200).json(resp)
        }
        catch (error) {
            res.status(500).json(error)
        }
    }
}