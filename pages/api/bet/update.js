import prisma from "../../../utils/prisma";

export default async function handler (req, res){
    //Mettre à jour bet par l'ID 
    const updateBet = await prisma.bet.update({
        //Get bet
        where: {
            id: req.body.id
        },
        data:{
            score: req.body.score
        }
    })
}