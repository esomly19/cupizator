import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    // Ajout d'un groupe 
    const user = await prisma.group.create({
        name: req.body.name,
        managerId: req.body.managerId,
    })
}