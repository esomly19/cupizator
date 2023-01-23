import prisma from "../../../utils/prisma";

export default async function handler (req, res){
    //Supprimer bet par l'ID 
    const deleteBet = await prisma.bet.delete({
        //Get bet
        where: {
            id: req.body.id
        },
    })
}