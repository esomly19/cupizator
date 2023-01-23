import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    const match = await prisma.group.create(
        {data: {
            ...req.body,
            matchs:{
                create: req.body.matchs
            }
        }
    })

    return res.status(200).send();

}

