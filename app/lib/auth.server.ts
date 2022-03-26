import { redirect } from 'remix'
import * as sessionStorage from './session.server'
import type { User } from './users.server'
import { getUser } from './users.server'

type AuthStorage<User, Id extends keyof User> = {
  getUser: () => Promise<User>
  login: (id: User[Id]) => Promise<Response>
  logout: () => Promise<Response>
}

type AuthStorageFactory<User, Id extends keyof User> = (
  request: Request
) => Promise<AuthStorage<User, Id>>

export const getAppStorage: AuthStorageFactory<User, 'id'> = async function (
  request
) {
  const session = await sessionStorage.getSession(request)
  return {
    getUser: async () => {
      const id = getId(session.get('app:id'))
      if (id === undefined) {
        throw redirect('/admin')
      }
      const user = await getUser(id)
      if (!user) {
        throw redirect('/admin')
      }
      return user
    },
    login: async (id) => {
      session.set('app:id', id)
      return redirect('/app', {
        headers: {
          'Set-Cookie': await sessionStorage.commitSession(session),
        },
      })
    },
    logout: async () => {
      return redirect('/admin', {
        headers: {
          'Set-Cookie': await sessionStorage.destroySession(session),
        },
      })
    },
  }
}

function getId(id: any): number | undefined {
  if (typeof id === 'number') {
    return id
  }
  if (id == null || typeof id !== 'string') {
    return undefined
  }

  const parsedId = parseInt(id, 10)
  return isNaN(parsedId) ? undefined : parsedId
}
