import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetAllContent = gql`
  {
    pageBy(uri: "home") {
      title
      page {
        intro
        content
      }
    }
    portfolio(first: 4, where: { orderby: { field: TITLE, order: ASC } }) {
      edges {
        node {
          title
          uri
        }
      }
    }
  }
`

export let loader = async () => {
  const { pageBy, portfolio } = await client.request(GetAllContent)

  return json({ pageBy, portfolio })
}

export let meta = () => {
  return {
    title: 'Front-End Development | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Index() {
  let { pageBy, portfolio } = useLoaderData()

  return (
    <>
      <h1>Ten1Seven Studio</h1>

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

      {!!pageBy.page.content && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: pageBy.page.content }}
        />
      )}
    </>
  )
}
