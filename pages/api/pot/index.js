import { prisma } from ".prisma/client";

export default async function handler(req, res){
    //By ID 
    const potId = await prisma.pot.findUnique({
        where: {
            id: req.body.id,
        }
    })
}