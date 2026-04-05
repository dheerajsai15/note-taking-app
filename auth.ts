import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { verifyPassword } from "./lib/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {strategy: "jwt"},
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials.password)
                    return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string
                    }
                });

                if(!user)
                    return null;

                const isValidPassword = await verifyPassword(credentials.password as string, user.passwordHash)
                if(!isValidPassword)
                    return null;

                return {
                    id: String(user.id),
                    email: user.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }){
            if(user){
                token.id = user.id
            }

            return token
        },

        async session({ session, token }){
            if(session.user){
                session.user.id = token.id as string
            }

            return session;
        }
    }
})