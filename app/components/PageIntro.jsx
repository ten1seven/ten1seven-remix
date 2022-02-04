// src/components/PageIntro.jsx

import nl2br from 'react-nl2br'

const PageIntro = ({ intro }) => {
  return (
    <p
      className="
        border-b
        border-gray-light
        italic
        my-8
        pb-8
        text-xl"
    >
      {nl2br(intro)}
    </p>
  )
}

export default PageIntro
