import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  magicToken: z.string().optional(),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        magicToken: { label: 'Magic Token', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const parsed = credentialsSchema.safeParse(credentials)
          if (!parsed.success) return null

          const { email, password, magicToken } = parsed.data

          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) return null

          if (magicToken) {
            const record = await prisma.verificationToken.findFirst({
              where: { identifier: email, token: magicToken },
            })
            if (!record || record.expires < new Date()) return null
            await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token: magicToken } } })
            return { id: user.id, email: user.email, name: user.name, role: user.role }
          }

          if (!password || !user.password) return null
          const valid = await bcrypt.compare(password, user.password)
          if (!valid) return null

          return { id: user.id, email: user.email, name: user.name, role: user.role }
        } catch (err) {
          console.error('[auth] authorize error:', err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const PUBLIC_PATHS = ['/', '/login', '/api/contact', '/api/auth', '/api/setup-admin', '/javier', '/laclasedigital', '/legal']
      const isPublic = PUBLIC_PATHS.some(
        (p) => nextUrl.pathname === p || nextUrl.pathname.startsWith(p + '/')
      )
      if (isPublic) return true

      const isLoggedIn = !!session?.user
      if (!isLoggedIn) return false

      if (nextUrl.pathname.startsWith('/admin') && session.user.role !== 'ADMIN') {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role ?? 'CLIENT'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
