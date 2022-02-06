import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../components/PageTitle'
import PageIntro from '../components/PageIntro'

const GetAllContent = gql`
  {
    pageBy(uri: "services") {
      title
      page {
        intro
        content
      }
      services {
        servicesList {
          description
          serviceTitle
        }
      }
    }
  }
`

export let loader = async () => {
  const { pageBy } = await client.request(GetAllContent)

  return json({ pageBy })
}

export function headers({ loaderHeaders }) {
  return {
    'Cache-Control': 'max-age=3600, public',
  }
}

export let meta = () => {
  return {
    title: 'Services | Ten 1 Seven Studio',
    description: '',
  }
}

export default function Services() {
  let { pageBy } = useLoaderData()

  return (
    <>
      <PageTitle link="/" breadcrumb="Home" title={pageBy.title} />
      <PageIntro intro={pageBy.page.intro} />

      <ul className="my-8">
        {pageBy.services.servicesList.map((item, index) => (
          <li
            className="service-grid border-b border-gray-light grid py-8"
            key={index}
          >
            <h2 className="mb-4 text-2xl md:pr-8">{item.serviceTitle}</h2>
            <div
              className="service-description"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
