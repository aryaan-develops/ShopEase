import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" } // CUSTOMER, VENDOR, ADMIN
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const { email, password, role } = credentials;

                let user = null;

                // Check in different models based on selected role or sequentially
                if (role === "ADMIN") {
                    user = await prisma.admin.findUnique({ where: { email } });
                } else if (role === "VENDOR") {
                    user = await prisma.vendor.findUnique({ where: { email } });
                } else {
                    user = await prisma.customer.findUnique({ where: { email } });
                }

                if (!user || !(user as any).password) return null;

                const isPasswordValid = await bcrypt.compare(password, (user as any).password);

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: (user as any).name || (user as any).vendor_name,
                    role: (user as any).role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
