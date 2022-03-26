import type { LoaderFunction } from 'remix'
import { Form, json, useLoaderData } from 'remix'
import { getAppStorage } from '~/lib/auth.server'
import type { User } from '~/lib/users.server'
import { getUser } from '~/lib/users.server'
import * as React from 'react'

type LoaderData = {
  readonly user: User
  readonly friends: readonly User[]
}

export const loader: LoaderFunction = async function ({ request }) {
  const storage = await getAppStorage(request)
  const user = await storage.getUser()
  const friends = user.friends.map((id) => getUser(id)).filter(isDefined)

  return json<LoaderData>({ user, friends })
}

function isDefined<T>(item: T | undefined): item is T {
  return item != null
}

export default function App() {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="p-4">
      <div className="flex justify-end gap-2">
        <div>Hello, {data.user.name}</div>
        <Form method="post" action="logout">
          <button type="submit" className="text-blue-600 underline">
            Log Out
          </button>
        </Form>
      </div>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-xl font-semibold">Friends</h1>
        <ul>
          {data.friends.map((user) => (
            <li key={user.id}>
              <span>
                {user.name} ({user.email})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
