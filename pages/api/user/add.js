import prisma from "../../../utils/prisma";


export default async function handler(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })
    if(!user||user.email===user.email)return res.status(404).json();

    await prisma.user.update({
        where: {
            email: user.email,
        },
        data: {
            usersId:[...user.usersId,user.id+""]
        },
    })
    res.status(200).json();
}
