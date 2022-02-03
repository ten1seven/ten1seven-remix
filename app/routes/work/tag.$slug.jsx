import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../../components/PageTitle'

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

      <ul>
        {tagList.edges.map(({ node }) => (
          <li key={node.uri}>
            {currentTag.edges[0].node.slug === node.slug ? (
              <>{node.name}</>
            ) : (
              <Link to={`/work${node.uri}`} prefetch="intent">
                {node.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ul>
        {workList.edges.map(({ node }) => (
          <li key={node.uri}>
            <Link to={`${node.uri}`} prefetch="intent">
              <img
                src={`https://ten1seven.imgix.net/${node.work.thumbnail.mediaDetails.file}?auto=format,compress&fit=crop&crop=center,top&w=260&h=215`}
                alt={node.work.thumbnail.altText}
                height="215"
                width="260"
                loading="lazy"
              />

              {node.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
