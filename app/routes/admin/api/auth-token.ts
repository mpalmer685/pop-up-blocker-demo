import type { LoaderFunction } from 'remix'
import { json } from 'remix'

export const loader: LoaderFunction = async function ({ request }) {
  const url = new URL(request.url)
  await wait(5000)
  const error = url.searchParams.get('error')
  if (error) {
    return json(error, { status: 500 })
  }
  return encodeURIComponent(url.search)
}

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
