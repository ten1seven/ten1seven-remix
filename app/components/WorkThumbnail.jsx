// src/components/WorkThumbnail.jsx

import { Link } from 'remix'

const WorkThumbnail = ({ loading, thumbnail }) => {
  return (
    <li key={thumbnail.uri}>
      <Link className="group block relative no-underline" to={thumbnail.uri}>
        <img
          src={`https://ten1seven.imgix.net/${thumbnail.work.thumbnail.mediaDetails.file}?auto=format,compress&fit=crop&crop=center,top&w=260&h=215`}
          alt={thumbnail.work.thumbnail.altText}
          height="215"
          width="260"
          loading={loading}
        />
        <span
          className="
            absolute
            bottom-0
            left-0
            w-full
            text-white
            text-sm
            bg-black
            bg-opacity-70
            block
            leading-none
            p-4
            pb-3
            group-hover:bg-opacity-90
            group-hover:pb-6
            whitespace-nowrap
            overflow-ellipsis
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            z-20"
        >
          {thumbnail.title}
        </span>
        <i
          className="
            absolute
            shadow-inner
            bg-white
            bg-opacity-20
            group-hover:bg-opacity-0
            inset-0
            transition-all
            duration-300
            ease-in-out
            z-10"
        ></i>
      </Link>
    </li>
  )
}

export default WorkThumbnail
