import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../utils/firebase";

const db = getDatabase();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.send("list users")
}

export default handler;