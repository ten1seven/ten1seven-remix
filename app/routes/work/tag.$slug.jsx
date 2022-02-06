import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../../components/PageTitle'
import TagList from '../../components/TagList'
import WorkThumbnails from '../../components/WorkThumbnails'

const GetAllContent = gql`
  query GetAllContent($slug: [String] = null, $tag: String!) {
    tagList: tags(where: { hideEmpty: false, orderby: NAME }) {
      edges {
        node {
          name
          uri
          slug
        }
      }
    }
    currentTag: tags(where: { slug: $slug }) {
      edges {
        node {
          name
          uri
          slug
        }
      }
    }
    workList: portfolio(
      first: 99
      where: { tag: $tag, orderby: { field: TITLE, order: ASC } }
    ) {
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

export let loader = async ({ params }) => {
  const { tagList, currentTag, workList } = await client.request(
    GetAllContent,
    {
      slug: `${params.slug}`,
      tag: `${params.slug}`,
    }
  )

  return json({ tagList, currentTag, workList })
}

export let meta = ({ data }) => {
  if (!data) {
    return {
      title: 'Ten 1 Seven Studio',
      description: '',
    }
  }

  return {
    title: ` ${data.currentTag.edges[0].node.name} | Ten 1 Seven Studio`,
    description: '',
  }
}

export default function Work() {
  let { tagList, currentTag, workList } = useLoaderData()

  return (
    <>
      <PageTitle
        link="/work"
        breadcrumb="Work"
        title={currentTag.edges[0].node.name}
      />

      <TagList tags={tagList.edges} currentTag={currentTag.edges[0].node} />
      <WorkThumbnails
        thumbnails={workList.edges}
        loading="lazy"
        classes="my-8"
      />
    </>
  )
}
