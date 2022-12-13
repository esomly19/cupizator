import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    const updatePassword = await prisma.user.update({
        where:{
            email: user.email
        },
        data:{
            password: req.body.password
        }
    })

    const updateName = await prisma.user.update({
        where:{
            email: user.email
        },
        data:{
            fristname: req.body.fristname,
            lastname: req.body.lastname
        }
    })

    const updateEmail = await prisma.user.update({
        where:{
            email: user.email
        },
        data:{
            email: req.body.email
        }
    })
}

