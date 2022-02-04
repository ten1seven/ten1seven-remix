// src/components/Header.jsx

import { Link } from 'remix'

import Wordmark from './Wordmark'
import NavigationLink from './NavigationLink'

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row">
      <Link className="wordmark" to="/">
        <Wordmark />
      </Link>

      <nav
        className="
        flex
        justify-center sm:justify-between
        sm:flex-grow
        mb-4 sm:mb-0"
      >
        <NavigationLink link="/work" title="Work" />{' '}
        <NavigationLink link="/services" title="Services" />{' '}
        <NavigationLink link="/about" title="About" />
      </nav>
    </header>
  )
}

export default Header
