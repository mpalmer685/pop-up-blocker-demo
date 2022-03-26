import type { ActionFunction, LoaderFunction } from 'remix'
import { redirect } from 'remix'
import { getAppStorage } from '~/lib/auth.server'

export const action: ActionFunction = async function ({ request }) {
  const form = await request.formData()
  const token = form.get('token')
  const userId = getUserId(token)

  const storage = await getAppStorage(request)
  return storage.login(userId)
}

export const loader: LoaderFunction = async function ({ request }) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const userId = getUserId(token)

  const storage = await getAppStorage(request)
  return storage.login(userId)
}

function getUserId(token: unknown): number {
  if (!token || typeof token !== 'string') {
    throw redirect('/admin')
  }
  const userIdParam = new URLSearchParams(token).get('userId') ?? ''
  const userId = parseInt(userIdParam, 10)
  if (isNaN(userId)) {
    throw redirect('/admin')
  }

  return userId
}
