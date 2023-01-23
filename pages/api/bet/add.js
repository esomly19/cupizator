import prisma from "../../../utils/prisma";
export default async function handler(req, res) {
    const bet = await prisma.bet.create(
        {data: {
            ...req.body,
            matchs:{
                create: req.body.bets
            }
        }
    })
    return res.status(200).send();
}