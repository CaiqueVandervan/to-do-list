import { dataBase } from "@/lib/dataBase";
import { Task, TaskExtended } from "@/models/Task";
import { ResultSetHeader } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query
    const idNum = Number(id)

    if (req.method === "DELETE") {
        try {

            const [task] = await dataBase.query<TaskExtended[]>("SELECT * FROM tasks WHERE id = ?", [idNum])

            const taskName = task[0]

            await dataBase.query<ResultSetHeader>("DELETE FROM tasks WHERE id = ?", [idNum])

            res.status(200).json(taskName)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    if (req.method === "PUT") {
        try {
            const { task_name, concluded }: Task = req.body

            const fields: string[] = []
            const values: (string | number | boolean)[] = []

            if (typeof task_name === "string") {
                fields.push("task_name = ?")
                values.push(task_name)
            }
            if (typeof concluded === "boolean") {
                fields.push("concluded = ?")
                values.push(concluded)
            }
            values.push(idNum)
            await dataBase.query<ResultSetHeader>(`UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`, values)

            const [resp] = await dataBase.query<TaskExtended[]>("SELECT * FROM tasks WHERE id= ?", [idNum])

            res.status(200).json(resp[0])

        } catch (error) {
            res.status(500).json(error)
        }
    }
}