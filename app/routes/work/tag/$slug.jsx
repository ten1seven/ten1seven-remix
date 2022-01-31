import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetAllContent = gql`
  query GetAllContent($uri: String!) {
    tagList: tags(where: { hideEmpty: false, orderby: NAME }) {
      edges {
        node {
          name
          uri
          slug
        }
      }
    }
    portfolio(
      first: 99
      where: { tag: $uri, orderby: { field: TITLE, order: ASC } }
    ) {
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

export let loader = async ({ params }) => {
  const { tagList, portfolio } = await client.request(GetAllContent, {
    uri: `${params.slug}`,
  })

  return json({ tagList, portfolio, params })
}

export let meta = () => {
  return {
    title: 'Work | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Work() {
  let { tagList, portfolio, params } = useLoaderData()

  return (
    <>
      <h1>Work</h1>

      <pre>{JSON.stringify(tagList, null, 2)}</pre>

      <ul>
        {tagList.edges.map(({ node }) => (
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
