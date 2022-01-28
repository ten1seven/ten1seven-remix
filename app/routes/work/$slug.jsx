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
    }
  }
`

export let loader = async ({ params }) => {
  const { workBy } = await client.request(GetWorkByUri, {
    uri: `/work/${params.slug}/`,
  })

  return json({ workBy })
}

export let meta = () => {
  return {
    title: 'Front-End Development | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Index() {
  let { workBy } = useLoaderData()

  return (
    <>
      <h1>{workBy.title} | Ten1Seven Studio</h1>

      <pre>{JSON.stringify(workBy, null, 2)}</pre>
    </>
  )
}
