import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'

import tailwindStyles from './index.css'
import 'what-input'

import Header from './components/Header'
import Footer from './components/Footer'

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
          <Header />

          <main className="bg-white p-6 sm:p-8 md:p-10">
            <Outlet />
          </main>

          <Footer />
        </div>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

// 404
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <html dir="ltr" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{caught.statusText}</title>
      </head>
      <body>
        <Header />

        <main className="bg-white p-6 sm:p-8 md:p-10">
          <CatchError errorText={caught.statusText} />
        </main>

        <Footer />

        <Scripts />
      </body>
    </html>
  )
}

// Uncaught exception
export function ErrorBoundary({ error }) {
  console.error(error)

  const errorText = 'Whoops!'

  return (
    <html dir="ltr" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{errorText}</title>
      </head>
      <body>
        <Header />

        <main className="bg-white p-6 sm:p-8 md:p-10">
          <CatchError errorText={errorText} />
        </main>

        <Footer />

        <Scripts />
      </body>
    </html>
  )
}
