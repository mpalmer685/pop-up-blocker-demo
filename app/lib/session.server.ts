import type { Session } from 'remix'
import { createCookieSessionStorage } from 'remix'

const storage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export function getSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get('Cookie'))
}

export const { commitSession, destroySession } = storage
