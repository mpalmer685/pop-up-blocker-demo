import type { ActionFunction, LoaderFunction } from 'remix'
import { redirect } from 'remix'
import { getAppStorage } from '~/lib/auth.server'

export const action: ActionFunction = async function ({ request }) {
  const storage = await getAppStorage(request)
  await storage.getUser()
  return storage.logout()
}

export const loader: LoaderFunction = () => redirect('/app')
