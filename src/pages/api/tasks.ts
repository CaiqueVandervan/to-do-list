import { dataBase } from "@/lib/dataBase"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const [resp]: any = await dataBase.query("SELECT * FROM tasks")
        res.status(200).json(resp)
    } else if(req.method === "POST"){
        const [resp]: any = await dataBase.query("INSERT INTO tasks(id) values(4)")
        res.status(200).json(resp)
    }
}