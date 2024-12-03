import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import { getUserById } from "./data/user";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages:{
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({user}){
            await prisma.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async session({ session, token }) {

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },

        /**
         * JWT callback to handle token enrichment with user role.
         */
        async jwt({ token, account, user }) {
            if (user) {
                // Check if the user is new
                const userCount = await prisma.user.count();
        
                if (userCount === 0) {
                    // First user becomes ADMIN
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { role: UserRole.ADMIN },
                    });
        
                    token.role = UserRole.ADMIN;
                } else {
                    token.role = user.role || UserRole.USER;
                }
            }
        
            return token;
        }
        
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
});
