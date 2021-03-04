import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../utils/firebase";

const db = getDatabase();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
    } = req;
    if(req.method == "GET"){
        const user = await getUser(Number(id));
        if(user){
            res.send(user.data())
        } else {
            res.status(404);
            res.send("Usuario nao encontrado")
        }
        return;
    }
}

const getUser = async (id : Number) => {
    return (await db.collection('users').where('id','==',id).get()).docs[0];
}

export default handler;