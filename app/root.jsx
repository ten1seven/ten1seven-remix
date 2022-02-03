import {
  Links,
  Link,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'

import tailwindStyles from './index.css'
import 'what-input'

export function meta() {
  return { title: 'Ten 1 Seven Studio' }
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: tailwindStyles,
    },
    {
      rel: 'preconnect',
      href: 'https://ten1seven.imgix.net',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Khula:wght@300;400;700&display=swap',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ]
}

export default function App() {
  return (
    <html dir="ltr" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="max-w-900 m-auto">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/work">Work</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>

          <main className="bg-white p-6 sm:p-8 md:p-10">
            <Outlet />
          </main>

          <footer
            className="
        footer
        font-sans
        pt-4
        px-6 sm:px-0
        text-gray-medium
        text-xs"
          >
            <p
              className="
          border-t-2 sm:border-t-0
          border-gray-light
          pt-4 sm:pt-0
          md:flex"
            >
              <NavLink className="pr-4" to="/">
                Home
              </NavLink>
              <NavLink className="pr-4" to="/work">
                Work
              </NavLink>
              <NavLink className="pr-4" to="/services">
                Services
              </NavLink>
              <NavLink className="pr-4" to="/about">
                About
              </NavLink>
            </p>

            <p className="mt-4 md:mt-0 md:text-right">
              <Link className="font-bold" to="/">
                Ten 1 Seven Studio
              </Link>{' '}
              is located in{' '}
              <a
                className="font-bold"
                href="https://en.wikipedia.org/wiki/Longmont,_CO"
              >
                Longmont, Colorado
              </a>
              .
              <br />
              Copyright &copy; 2002 - {new Date().getFullYear()}. All rights
              reserved.
            </p>
          </footer>
        </div>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
