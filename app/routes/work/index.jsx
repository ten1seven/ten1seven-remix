import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../../components/PageTitle'
import PageIntro from '../../components/PageIntro'
import TagList from '../../components/TagList'
import WorkThumbnails from '../../components/WorkThumbnails'

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

export function headers({ loaderHeaders }) {
  return {
    'Cache-Control': 'max-age=3600, public',
  }
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
      <PageTitle link="/" breadcrumb="Home" title={pageBy.title} />
      <PageIntro intro={pageBy.page.intro} />

      {!!pageBy.page.content && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: pageBy.page.content }}
        />
      )}

      <TagList tags={tags.edges} currentTag="" />
      <WorkThumbnails
        thumbnails={portfolio.edges}
        loading="lazy"
        classes="my-8"
      />
    </>
  )
}
