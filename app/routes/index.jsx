import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetAllProjects = gql`
  {
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
  const { portfolio } = await client.request(GetAllProjects)

  return json({ portfolio })
}

export let meta = () => {
  return {
    title: 'Front-End Development | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Index() {
  let { portfolio } = useLoaderData()

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
    </>
  )
}
