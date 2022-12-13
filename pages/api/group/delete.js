import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    //Supprimer un groupe par son Id
    const deleteGroup = await prisma.user.delete ({
        where: {
            id: req.body.id
        }
    })

    //Supprimer tous les groupes
    const deletGroup = await prisma.user.deleteMany({})
}