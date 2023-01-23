import prisma from "../../../utils/prisma";

export default async function handler (req, res){
    //ajout de pot 
    const pot = await prisma.pot.create({
        data:{
            ...req.body,
            pots:{
                create: req.body.pots
            }
        }
    })
    return res.status(200).send();
}