import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    //ajout d'un match
    const match = await prisma.match.create({
        date: req.body.date,
        Group: req.body.Group,
        team1: req.body.team1,
        team2: req.body.team2
    })
}