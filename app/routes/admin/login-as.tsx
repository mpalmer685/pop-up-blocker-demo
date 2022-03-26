import * as React from 'react'
import { useSearchParams } from 'remix'

export default function LoginAs() {
  const form = React.useRef<HTMLFormElement>(null)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const error = searchParams.get('error') ?? ''

  React.useEffect(() => {
    if (token) {
      form.current?.submit()
    }
  }, [token])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {error ? (
        <div>
          <h1 className="text-2xl text-red-500">
            An error occurred while signing you in.
          </h1>
          <p className="text-gray-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
          Signing you in...
          <form ref={form} action="/app/api/login" method="post">
            <input type="hidden" name="token" value={token} />
          </form>
        </>
      )}
    </div>
  )
}
