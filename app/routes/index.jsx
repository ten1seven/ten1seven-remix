import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import WorkThumbnails from '../components/WorkThumbnails'

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
      <WorkThumbnails
        thumbnails={portfolio.edges}
        classes="homepage-work
        border-b
        border-gray-light
        my-8
        pb-8"
      />

      {!!pageBy.page.content && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: pageBy.page.content }}
        />
      )}
    </>
  )
}
