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
              sizes
              srcSet
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

      <pre>{JSON.stringify(tags, null, 2)}</pre>

      <ul>
        {tags.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`/work${node.uri}`} prefetch="intent">
              {node.name}
            </Link>
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(portfolio, null, 2)}</pre>

      <ul>
        {portfolio.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`${node.uri}`} prefetch="intent">
              {node.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
