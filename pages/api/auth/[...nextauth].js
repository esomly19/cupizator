import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../utils/prisma";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const bcrypt = require('bcrypt');
                const user = await prisma.user.findUnique({
                    where: {
                        email: req.body.email,
                    },
                })
                if (user && await bcrypt.compare(req.body.password,user.password)) {
                    return user;
                }
                return null;
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.SECRET_JWT,
    jwt:{
        secret: process.env.SECRET_JWT,
        encryption:true
    },
    pages:{
        signIn:"/auth/login"
    }
})
