// src/components/TagList.jsx

import { Link } from 'remix'

const TagList = ({ tags, currentTag }) => {
  return (
    <>
      <h3 className="sr-only">Tags</h3>
      <ul className="flex flex-wrap">
        {tags.map((tag) => {
          return (
            <li className="pr-3" key={tag.node.uri}>
              {currentTag.slug === tag.node.slug ? (
                <span className="text-gray-medium font-normal">
                  {tag.node.name}
                </span>
              ) : (
                <Link to={`/work${tag.node.uri}`} prefetch="intent">
                  {tag.node.name}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TagList
