import prisma from "../../../utils/prisma";
export default async function handler(req, res) {
    const group = await prisma.group.update(
        {
            where:{
                id: req.body.group.id
            },
            data: {
                members:{
                    connect: req.body.bettor
                }
            }
        })
    return res.status(200).send();
}

