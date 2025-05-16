import ContaRepository from "@/core/repositories/ContaRepository";
import validaEmail from "@/core/utils/validaEmail";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: number;
  }
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.email ||
          !credentials.senha ||
          !validaEmail(credentials.email)
        ) {
          return null;
        }

        const contaRepository = new ContaRepository();
        const conta = await contaRepository.findByEmail(credentials.email);

        if (!conta) return null;

        const isPasswordValid = await bcrypt.compare(credentials.senha, conta.senha);
        if (!isPasswordValid) return null;

        return {
          id: conta.id,
          email: conta.email,
          name: conta.nome,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as User).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
