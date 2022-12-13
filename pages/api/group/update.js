import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    const updateGroup = await prisma.user.update({
        where: {
            id: req.body.id
        },
        data: {
            name: req.body.name
        }
    })
}