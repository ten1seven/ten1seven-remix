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

export function headers({ loaderHeaders }) {
  return {
    'Cache-Control': 'max-age=3600, public',
  }
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

      <div className="work-detail">
        {!!workBy.work.description && (
          <div
            className="work-detail__desc wysiwyg"
            dangerouslySetInnerHTML={{ __html: workBy.work.description }}
          />
        )}

        <div className="work-detail__client pr-4 text-base">
          <h2 className="font-bold text-gray-medium">Client</h2>
          <p>{workBy.work.client}</p>

          <h2 className="font-bold mt-4 text-gray-medium">Website</h2>
          <p>
            <a
              className="block overflow-ellipsis overflow-hidden whitespace-nowrap"
              href={workBy.work.website}
            >
              {workBy.work.displayUrl}
            </a>
          </p>
        </div>
        <div className="work-detail__tags pr-4 text-base">
          <h2 className="font-bold text-gray-medium">Tags</h2>
          <ul>
            {workBy.tags.edges.map(({ node }) => (
              <li key={node.id}>
                <Link to={`/work${node.uri}`} prefetch="intent">
                  <span>{node.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="sr-only">Images</h2>
      <ul className="work-screenshots">
        {workBy.work.images.map(({ image }) => (
          <li className="border-t-2 border-gray-light my-8 pt-8" key={image.id}>
            <img
              sizes="(max-width: 830px) 100vw, 830px"
              srcSet={`https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=330 330w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=443 443w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=600 600w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=668 668w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=731 731w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=811 811w,
              https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=830 830w`}
              src={`https://ten1seven.imgix.net/${image.mediaDetails.file}?auto=format,compress&w=600`}
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
