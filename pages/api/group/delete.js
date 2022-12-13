import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    const deleteGroup = await prisma.user.delete ({
        where: {
            id: req.body.id
        }
    })

    const deletGroup = await prisma.user.deleteMany({})
}