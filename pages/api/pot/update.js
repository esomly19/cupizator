import prisma from "../../../utils/prisma";

export default async function handler(req, res){
    //Mettre à jour pot par Id
    const updatePot = await prisma.pot.update({
        //get pot 
        where:{
            id: req.body.id
        },
        data: {
            name: req.body.name,
            tag: req.body.tag,
            state: req.body.state,
            type: req.body.type
        }
    })



}