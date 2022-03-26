import type { LinksFunction, MetaFunction } from 'remix'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import tailwind from './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Pop-up demo',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-0 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
