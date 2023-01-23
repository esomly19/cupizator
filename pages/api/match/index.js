import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    //By name 
    const matchDate = await prisma.match.findMany({
        where:{
            date: req.body.date,
        },
    })

    //By ID 
    const matchID = await prisma.match.findUnique({
        where:{
            id: req.body.id,
        },
    })

}