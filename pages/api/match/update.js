import { prisma } from ".prisma/client";

export default async function handler (req, res){
    //Mettre à jour match par l'ID 
    const updateMatch = await prisma.match.update({
        //Get match
        where: {
            id: req.body.id
        },
        data:{
            score1: req.body.score1,
            score2: req.body.score2
        }
    })
}