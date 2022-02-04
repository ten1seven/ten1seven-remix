// src/components/NavigationLink.jsx

import { NavLink } from 'remix'

const NavigationLink = ({ title, link }) => {
  return (
    <NavLink
      className="
          navigation-link
          sm:flex-grow
          font-normal
          sm:grid
          px-6 sm:px-0
          sm:place-items-center
          sm:rounded-t-sm
          text-lg
          text-gray-medium"
      to={link}
      prefetch="intent"
    >
      {title}
    </NavLink>
  )
}

export default NavigationLink
