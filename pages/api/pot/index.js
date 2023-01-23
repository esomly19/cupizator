import prisma from "../../../utils/prisma";

export default async function handler(req, res){
    //By ID 
    const potId = await prisma.pot.findUnique({
        where: {
            id: req.body.id,
        }
    })
    return res.status(200).send(potId);
}