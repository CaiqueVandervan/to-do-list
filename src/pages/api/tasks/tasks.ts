import { dataBase } from "@/lib/dataBase"
import { NextApiRequest, NextApiResponse } from "next"

export async function getAllTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const [resp] = await dataBase.query("SELECT * FROM tasks")
            res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export async function postTasks(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { task_name } = req.body
            const [resp] = await dataBase.query("INSERT INTO tasks (task_name, concluded, created_at) VALUES (?, ? , NOW())", [task_name, false])
            res.status(200).json(resp)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return getAllTasks(req, res)
    }
    if (req.method === "POST") {
        return postTasks(req, res)
    }
}