import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    //Mettre à jour groupe par l'Id 
    const updateGroup = await prisma.group.update({
        where: {
            id: req.body.id
        },
        data: {
            name: req.body.name
        }
    })
}