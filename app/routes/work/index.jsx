import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetAllContent = gql`
  {
    pageBy(uri: "work") {
      title
      page {
        intro
        content
      }
    }
    tags(where: { hideEmpty: false, orderby: NAME }) {
      edges {
        node {
          name
          uri
          slug
        }
      }
    }
    portfolio(first: 99, where: { orderby: { field: TITLE, order: ASC } }) {
      edges {
        node {
          title
          uri
          work {
            thumbnail {
              altText
              mediaDetails {
                file
              }
            }
          }
        }
      }
    }
  }
`

export let loader = async () => {
  const { pageBy, tags, portfolio } = await client.request(GetAllContent)

  return json({ pageBy, tags, portfolio })
}

export let meta = () => {
  return {
    title: 'Work | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Work() {
  let { pageBy, tags, portfolio } = useLoaderData()

  return (
    <>
      <h1>Work</h1>

      <p>{pageBy.page.intro}</p>

      <div dangerouslySetInnerHTML={{ __html: pageBy.page.content }} />

      <ul>
        {tags.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`/work${node.uri}`} prefetch="intent">
              {node.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        {portfolio.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`${node.uri}`} prefetch="intent">
              <img
                src={`https://ten1seven.imgix.net/${node.work.thumbnail.mediaDetails.file}?auto=format,compress&fit=crop&crop=center,top&w=260&h=215`}
                alt={node.work.thumbnail.altText}
                height="215"
                width="260"
                loading="lazy"
              />

              {node.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
