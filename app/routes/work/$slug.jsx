import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetWorkByUri = gql`
  query GetWorkByUri($uri: String!) {
    workBy(uri: $uri) {
      uri
      title
      work {
        client
        description
        displayUrl
        website
      }
      tags {
        edges {
          node {
            name
            slug
            uri
          }
        }
      }
    }
  }
`

export let loader = async ({ params }) => {
  const { workBy } = await client.request(GetWorkByUri, {
    uri: `/work/${params.slug}/`,
  })

  return json({ workBy })
}

export let meta = ({ data }) => {
  if (!data) {
    return {
      title: 'Ten 1 Seven Studio',
      description: '',
    }
  }

  return {
    title: ` ${data.workBy.title} | Ten 1 Seven Studio`,
    description: '',
  }
}

export default function Index() {
  let { workBy } = useLoaderData()

  return (
    <>
      <h1>{workBy.title} | Ten1Seven Studio</h1>

      <pre>{JSON.stringify(workBy, null, 2)}</pre>

      <ul>
        {workBy.tags.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`/work${node.uri}`} prefetch="intent">
              {node.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
