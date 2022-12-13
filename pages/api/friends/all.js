import {getToken} from "next-auth/jwt";
import prisma from "../../../utils/prisma";
const crypto = require('crypto')

export default async function handler(req, res) {
    const token = await getToken({ req, secret:process.env.SECRET_JWT})
    const user = await prisma.user.findUnique({
        where: {
            email: token.email,
        },
    })
    if(!user)return res.status(404).json();
    let friends =await Promise.all(user.friendsId.map(async (id,index)=>{
        let friend = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                email: true,
                firstname: true,
                lastname: true
            },
        });
        return {
            ...friend,
            key:index,
            avatar:"https://www.gravatar.com/avatar/"+crypto.createHash('md5').update(friend.email).digest("hex"),
            status:"friend"
        }
    }))
    res.status(200).json(friends);
}
