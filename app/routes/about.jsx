import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

const GetAllContent = gql`
  {
    pageBy(uri: "about") {
      title
      page {
        intro
        content
      }
    }
  }
`

export let loader = async () => {
  const { pageBy } = await client.request(GetAllContent)

  return json({ pageBy })
}

export let meta = () => {
  return {
    title: 'About | Ten 1 Seven Studio',
    description: '',
  }
}

export default function About() {
  let { pageBy } = useLoaderData()

  return (
    <>
      <h1>About</h1>

      <p>{pageBy.page.intro}</p>

      <div dangerouslySetInnerHTML={{ __html: pageBy.page.content }} />
    </>
  )
}
