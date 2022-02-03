import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../../components/PageTitle'

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
        images {
          image {
            altText
            id
            mediaDetails {
              file
              height
              width
            }
          }
        }
      }
      tags {
        edges {
          node {
            id
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
      <PageTitle link="/work" breadcrumb="Work" title={workBy.title} />

      <pre>{JSON.stringify(workBy, null, 2)}</pre>

      <p>{workBy.work.client}</p>
      <p>
        <a href={workBy.work.website}>{workBy.work.displayUrl}</a>
      </p>

      {!!workBy.work.description && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: workBy.work.description }}
        />
      )}

      <ul>
        {workBy.tags.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={`/work${node.uri}`} prefetch="intent">
              {node.name}
            </Link>
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(workBy.work.images, null, 2)}</pre>

      <ul>
        {workBy.work.images.map(({ image }) => (
          <li key={image.id}>
            <img
              src={`https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress`}
              alt={image.altText}
              height={image.mediaDetails.height}
              width={image.mediaDetails.width}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </>
  )
}
