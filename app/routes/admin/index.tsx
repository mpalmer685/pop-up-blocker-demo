import * as React from 'react'
import type { LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import type { User } from '~/lib/users.server'
import { getAllUsers } from '~/lib/users.server'

type LoaderData = {
  readonly users: readonly User[]
}

export const loader: LoaderFunction = function () {
  const users = getAllUsers()

  return json<LoaderData>({ users })
}

export default function Admin() {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-xl font-semibold">Users</h1>
        <ul>
          {data.users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between p-2 even:bg-gray-100 hover:bg-gray-200"
            >
              <span>
                {user.name} ({user.email})
              </span>
              <span className="space-x-4 text-sm">
                <LoginWithGet userId={user.id} />
                <LoginWithPost userId={user.id} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function LoginWithGet({ userId }: { userId: number }) {
  async function loginWithGet() {
    const w = window.open('/admin/login-as', '_blank')
    if (!w) {
      return
    }

    try {
      const token = await getAuthToken(userId)
      w.location.href = `/app/api/login?token=${token}`
    } catch (e: unknown) {
      w.location.href = `/admin/login-as?error=${e}`
    }
  }

  return (
    <button className="underline hover:text-blue-600" onClick={loginWithGet}>
      Log in with GET
    </button>
  )
}

function LoginWithPost({ userId }: { userId: number }) {
  async function loginWithPost() {
    const w = window.open('/admin/login-as', '_blank')
    if (!w) {
      return
    }

    try {
      const token = await getAuthToken(userId)
      w.location.href = `/admin/login-as?token=${token}`
    } catch (e: unknown) {
      w.location.href = `/admin/login-as?error=${e}`
    }
  }

  return (
    <button className="underline hover:text-blue-600" onClick={loginWithPost}>
      Log in with POST
    </button>
  )
}

async function getAuthToken(userId: number) {
  const url = new URL('/admin/api/auth-token', window.location.origin)
  url.searchParams.append('userId', String(userId))
  if (userId % 3 === 0) {
    url.searchParams.set('error', 'Unable to generate auth token')
  }

  const response = await fetch(url.href)
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    throw data
  }
}
