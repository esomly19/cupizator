import prisma from "../../../utils/prisma";
export default async function handler(req, res) {
    const groups = await prisma.group.findMany({
        include: {
            matchs: true, // Return all fields
        },
    })
    return res.status(200).send(groups);
}

