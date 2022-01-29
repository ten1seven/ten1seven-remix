import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

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
      <h1>Services</h1>
      <p>{pageBy.page.intro}</p>

      {pageBy.services.servicesList.map((item, index) => (
        <div key={item.id}>
          <h3>{item.serviceTitle}</h3>
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      ))}
    </>
  )
}
