import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const exist = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    });

    if(exist) return res.status(400).json({state:"EXIST"});
    await prisma.user.create({
        data: {
            ...req.body,
            password:hashed
        },
    })
    return res.status(200).json({state:"CREATED"})
}