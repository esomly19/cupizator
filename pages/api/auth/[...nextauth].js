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
    callbacks:{
        jwt: async ({token,user}) => {
            if(user){
                token.id = user.id;
            }
            return token;
        },
        session: ({session, token}) => {
            if(token){
                session.token=token;
                session.id = token.id;
            }
            return session;
        }
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
