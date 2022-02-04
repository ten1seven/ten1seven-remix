// src/components/Footer.jsx

import { Link } from 'remix'

const Footer = () => {
  return (
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
        <Link className="pr-4" to="/">
          Home
        </Link>{' '}
        <Link className="pr-4" to="/work">
          Work
        </Link>{' '}
        <Link className="pr-4" to="/services">
          Services
        </Link>{' '}
        <Link className="pr-4" to="/about">
          About
        </Link>
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
        Copyright &copy; 2002 - {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
