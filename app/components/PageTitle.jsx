// src/components/PageTitle.jsx

import { Link } from 'remix'

const PageTitle = ({ link, breadcrumb, title }) => {
  return (
    <h1
      className="
        border-b-2
        border-gray-light
        leading-none
        mb-8
        pb-4
        text-2xl md:text-4xl
        text-red
        hover:text-gray-medium"
    >
      <Link
        className="
          text-gray-medium
          no-underline
          hover:underline"
        to={link}
      >
        {breadcrumb}
      </Link>{' '}
      <span className="text-gray-medium">/</span> {title}
    </h1>
  )
}

export default PageTitle
