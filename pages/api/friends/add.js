import {getToken} from "next-auth/jwt";
import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    const token = await getToken({ req, secret:process.env.SECRET_JWT})
    const user = await prisma.user.findUnique({
        where: {
            email: token.email,
        },
    })
    const friend = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })
    if(!friend||!user||user.email===friend.email)return res.status(404).json();

    await prisma.user.update({
        where: {
            email: user.email,
        },
        data: {
            friendsId:[...user.friendsId,friend.id+""]
        },
    })
    res.status(200).json();
}
